import React from 'react';
import {Button} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {G_API_KEY} from '@env';

//google map
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useRecoilState} from 'recoil';
import {LocationTypeAtom} from '../assets/recoilValues';
import {useFocusEffect} from '@react-navigation/native';

Geolocation.requestAuthorization('whenInUse');

interface IType {
  latitude: number | undefined;
  longitude: number | undefined;
}

export const Map = ({navigation}) => {
  const [location, setLocation] = React.useState<IType | undefined>(undefined);
  // const [triggerFunc, setTriggerFunc] = React.useState(false);
  // const setLocationType = useSetRecoilState(LocationTypeAtom);
  const [locationType, setLocationType] = useRecoilState(LocationTypeAtom);

  const mApiKey = G_API_KEY;

  const addTypeList = [
    'university',
    'school',
    'store',
    'library',
    'gym',
    'movie_theater',
    'convenience_store',
    'restaurant',
    'taxi_stand',
    'train_station',
    'subway_station',
  ];

  const getAddress = () => {
    setLocationType('university');
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        location?.latitude +
        ',' +
        location?.longitude +
        '&key=' +
        mApiKey +
        '&language=ko',
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('udonPeople ' + responseJson.results[0].formatted_address);
        console.log('udonPeople ' + responseJson.results[0].types);
        const returnLocList = responseJson.results[0].types;
        for (const element of returnLocList) {
          for (const typeElement of addTypeList) {
            if (typeElement === element) {
              setLocationType(element);
              break;
            }
          }
        }
      })
      .catch(err => console.log('udonPeople error : ' + err));
  };

  // React.useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setLocation({latitude, longitude});
  //     },
  //     error => {
  //       console.log(error.code, error.message);
  //     },
  //     // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  //   // getAddress();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          console.log(error.code, error.message);
        },
        // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }, []),
  );

  // React.useEffect(() => {
  //   console.log(location);
  //   getAddress();
  // }, [location]);

  useFocusEffect(
    React.useCallback(() => {
      console.log(location);
      getAddress();
    }, [location]),
  );

  // const toYesFunc = () => {
  //   setTriggerFunc(true);
  //   navigation.navigate('Home', {screen: 'Translation'});
  // };

  return (
    // <SafeAreaView>
    <Wrapper>
      {location?.latitude && location?.longitude && (
        <MapView
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[styles.map]}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
      )}
      <LocationInfoTab>
        <AskText>{`Are you here now? : ${locationType}`}</AskText>
        <Button
          title="Yes"
          onPress={() => {
            navigation.navigate('Home', {screen: 'Translation'});
          }}
        />
        <Button title="No" onPress={() => navigation.navigate('Selection')} />
        <Button
          title="online"
          onPress={() => {
            setLocationType('online');
            navigation.navigate('Home', {screen: 'Translation'});
          }}
        />
      </LocationInfoTab>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const LocationInfoTab = styled.View`
  display: flex;
  flex-direction: column;
  height: 25%;
  /* justify-content: center; */
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
`;

const AskText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {G_API_KEY} from '@env';

//google map
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';

Geolocation.requestAuthorization('whenInUse');

export const Map = () => {
  const [location, setLocation] = React.useState({
    latitude: 37.50377,
    longitude: 126.955799,
  });

  const mApiKey = G_API_KEY;

  const getAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        location.latitude +
        ',' +
        location.longitude +
        +'&key=' +
        mApiKey +
        '&language=ko',
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('udonPeople ' + responseJson.results[0].formatted_address);
      })
      .catch(err => console.log('udonPeople error : ' + err));
  }

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    // <SafeAreaView>
    <Wrapper>
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
        showsMyLocationButton={true}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          // title="this is a marker"
          // description="this is a marker example"
        />
      </MapView>
      <SafeAreaView>
        <LocationInfoTab>
          <Text>component Test</Text>
        </LocationInfoTab>
      </SafeAreaView>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const LocationInfoTab = styled.View`
  display: flex;
  height: 30%;
`;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useSetRecoilState } from 'recoil';
import { LocationTypeAtom } from '../assets/recoilValues';

type locationType = {
  label: string;
};

export default function PlaceSelectBtn(props: {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [filters, setFilters] = React.useState([
    {label: 'university'},
    {label: 'school'},
    {label: 'store'},
    {label: 'online'},
    {label: 'library'},
    {label: 'gym'},
    {label: 'movie_theater'},
    {label: 'convenience_store'},
    {label: 'restaurant'},
    {label: 'taxi_stand'},
    {label: 'train_station'},
    {label: 'subway_station'},
  ]);
  const [selected, setSelected] = React.useState(filters[0]);
  // const setLocationFilter = useSetRecoilState(LocationTypeAtom);
  React.useEffect(() => {
    // setLocationFilter(selected.label);
  }, [selected]);

  const callback = data => {
    if (selected === data) {
      return setSelected(filters[0]);
    }
    setSelected(data);
    props.setLocation(data.label);
    console.log(data.label);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'flex-start'}}
      centerContent={false}
      horizontal={true}>
      <View style={styles.viewContainer}>
        {filters.map((filter, key) => (
          <CustomButton
            key={key}
            selected={filter === selected}
            //   disabled={
            //     filter !== selected &&
            //     selected !== filters[0] &&
            //     filter !== filters[0]
            //   }
            data={filter}
            callback={callback}
          />
        ))}
      </View>
    </ScrollView>
  );
}

interface FilterButtonProps {
  callback: (data: locationType) => void;
  selected: boolean;
  data: locationType;
}

const CustomButton = (props: FilterButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: props.selected ? 'white' : '#C9C9C9',
          borderColor: props.selected ? '#1556FE' : '#C9C9C9',
        },
      ]}
      onPress={() => {
        // if (props.callback && !props.disabled) {
        if (props.callback) {
          props.callback(props.data);
        }
      }}>
      <Text
        style={{color: props.selected ? '#1556FE' : '#696969', fontSize: 18}}>
        {props.data.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  viewContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    borderWidth: 2,
    borderRadius: 13,
    padding: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 8,
  },
});

import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { filterType } from './FilterBtn';
import { useSetRecoilState } from 'recoil';
import { IntimacyFilterAtom } from '../assets/recoilValues';

export default function IntimacyBtn() {
  const [text, setText] = React.useState('');
  const [filters, setFilters] = React.useState([
    {label: '1'},
    {label: '2'},
    {label: '3'},
  ]);
  const [selected, setSelected] = React.useState(filters[0]);

  const setIntimacyFilter = useSetRecoilState(IntimacyFilterAtom);

  React.useEffect(() => {
    setIntimacyFilter(selected.label);
  }, [selected]);

  const callback = data => {
    if (selected === data) {
      return setSelected(filters[0]);
    }
    setSelected(data);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'flex-start'}}
      centerContent={false}
      horizontal={true}>
      <View style={styles.viewContainer}>
        {filters.map(filter => (
          <CustomButton
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
  callback: (data: filterType) => void;
  selected: boolean;
//   disabled: boolean;
  data: filterType;
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
      <Text style={{color: props.selected ? '#1556FE' : '#696969'}}>
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
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: 8,
  },
});

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {PersonFilterAtom} from '../assets/recoilValues';

export type personFilterType = {
  label: string;
};

export default function FilterBtn(props: {getFilter: personFilterType[]}) {
  const [filters, setFilters] = React.useState(props.getFilter);
  const [selected, setSelected] = React.useState(filters[0]);

  const setPersonFilter = useSetRecoilState(PersonFilterAtom);

  React.useEffect(() => {
    setPersonFilter(selected.label);
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
  callback: (data: personFilterType) => void;
  selected: boolean;
//   disabled: boolean;
  data: personFilterType;
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
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 8,
  },
});

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
import {useFocusEffect} from '@react-navigation/native';

export type personFilterType = {
  label: string;
};

export default function FilterBtn(props: {
  getFilter: personFilterType[];
  selectedFilter?: string | undefined;
  setSelectedFilter?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFilterChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [filters, setFilters] = React.useState(props.getFilter);
  const [selected, setSelected] = React.useState<personFilterType | undefined>(
    undefined,
  );

  // const setPersonFilter = useSetRecoilState(PersonFilterAtom);

  React.useEffect(() => {
    if (selected !== undefined) {
      if (props.setSelectedFilter) {
        props.setSelectedFilter(selected?.label);
      }
    }
    if (props.setFilterChanged) {
      props.setFilterChanged(true);
    }
  }, [selected]);

  //입력시 선택되었던 항목 비활성화
  useFocusEffect(
    React.useCallback(() => {
      if (props.selectedFilter) {
        if (props.selectedFilter.length === 0) {
          setSelected(undefined);
        } else {
          for (let i = 0; i < filters.length; i++) {
            if (props.selectedFilter === filters[i].label) {
              setSelected(filters[i]);
              break;
            } else {
              setSelected(undefined);
            }
          }
        }
      } else {
        setSelected(undefined);
      }
    }, [props.selectedFilter]),
  );

  useFocusEffect(
    React.useCallback(() => {
      setFilters(props.getFilter);
    }, [props.getFilter]),
  );

  const callback = data => {
    if (selected === data) {
      return setSelected(undefined);
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

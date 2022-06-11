import React, {FC} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props =
  | {
      leftText: string;
      rightText: string;
    }
  | {
      title: string;
      onPress?: (event: GestureResponderEvent) => void;
    };

const ListItem: FC<Props> = props => {
  if ('title' in props) {
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Text style={styles.text}>{props.title}</Text>
        <Icon name="chevron-forward-outline" size={16} color="#fff"></Icon>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.leftText}</Text>
      <Text style={styles.text}>{props.rightText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    borderBottomColor: 'rgba(255, 255, 255, 0.24)',
    borderBottomWidth: 1,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default ListItem;

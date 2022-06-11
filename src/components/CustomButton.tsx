import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ButtonProps, Text, TouchableOpacity} from 'react-native';

const CustomButton: FC<ButtonProps> = props => {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(75, 85, 99, 0.5)',
    borderRadius: 8,
    paddingTop: 6,
    paddingBottom: 8,
  },
  buttonText: {color: 'white', fontSize: 16},
});

export default CustomButton;

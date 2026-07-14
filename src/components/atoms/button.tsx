import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'outlined' | 'filled';
};
const Button = ({ title, onPress, variant = 'filled' }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={variant === 'outlined' ? styles.cantainer2 : styles.cantainer}
    >
      <Text style={variant === 'outlined' ? styles.text2 : styles.text}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  cantainer: { backgroundColor: 'red', borderRadius: 50, padding: 12 },
  cantainer2: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 12,
    borderColor: 'red',
    borderWidth: 1,
  },
  text: { color: 'white' },
  text2: { color: 'red' },
});

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type LinkButtonProps = {
  title: string;
  onPress: () => void;
};

const LinkButton = ({ title, onPress }: LinkButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  title: {
    color: '#4F46E5', // Figmaya yakın mavi
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

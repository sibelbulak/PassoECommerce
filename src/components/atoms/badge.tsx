import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
type BadgeProps = {
  count: number;
};
const Badge = ({ count }: BadgeProps) => {
  if (count <= 0) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

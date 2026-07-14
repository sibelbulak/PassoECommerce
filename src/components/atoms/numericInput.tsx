import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

type NumericInputProps = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const NumericInput = ({ value, onIncrease, onDecrease }: NumericInputProps) => {
  const handleDecrease = () => {
    if (value <= 1) {
      Alert.alert('Uyarı', "Ürün adedi 1'den az olamaz.");
      return;
    }

    onDecrease();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleDecrease}>
        <Text style={styles.buttonText}>−</Text>
      </Pressable>

      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{value}</Text>
      </View>

      <Pressable style={styles.button} onPress={onIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

export default NumericInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  button: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  valueBox: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 24,
  },

  valueText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

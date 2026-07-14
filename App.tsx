import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NumericInput from './src/components/atoms/numericInput';

function App() {
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        <NumericInput
          value={quantity}
          onIncrease={() => setQuantity(currentValue => currentValue + 1)}
          onDecrease={() => setQuantity(currentValue => currentValue - 1)}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

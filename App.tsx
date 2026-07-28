import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/appNavigator';
import { StoreProvider } from './src/store/storeContext';
import { LoadingProvider } from './src/context/loadingContext';
import GlobalLoader from './src/components/atoms/globalLoader';
import AxiosInterceptor from './src/services/axiosInterceptor';
function App() {
  return (
    <SafeAreaProvider>
      <LoadingProvider>
        <AxiosInterceptor />
        <SafeAreaView style={styles.safeArea}>
          <StoreProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </StoreProvider>
          <GlobalLoader />
        </SafeAreaView>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;

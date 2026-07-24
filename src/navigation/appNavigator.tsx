import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../components/pages/homepage';
import type { RootStackParamList } from './types';
import ProductDetailPage from '../components/pages/productDetailPage';
import BasketPage from '../components/pages/basketPage';
import FavoritesPage from '../components/pages/favoritesPage';
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="ProductDetail" component={ProductDetailPage} />
      <Stack.Screen name="Basket" component={BasketPage} />
      <Stack.Screen name="Favorites" component={FavoritesPage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

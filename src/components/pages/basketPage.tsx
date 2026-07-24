import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Nav from '../atoms/nav';
import type { RootStackParamList } from '../../navigation/types';
import { useStore } from '../../store/storeContext';
import BasketCardItem from '../molecules/basketCardItem/basketCardItem';
type BasketPageProps = NativeStackScreenProps<RootStackParamList, 'Basket'>;

const BasketPage = ({ navigation }: BasketPageProps) => {
  const { cartItems, increaseCartItem, decreaseCartItem, removeCartItem } =
    useStore();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  return (
    <View style={styles.container}>
      <Nav variant="basket" onBackPress={navigation.goBack} />
      {cartItems.length === 0 ? (
        <Text style={styles.text}>Sepetiniz boş.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.product.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <BasketCardItem
              item={item}
              onIncrease={() => increaseCartItem(item.product.id)}
              onDecrease={() => decreaseCartItem(item.product.id)}
              onRemove={() => removeCartItem(item.product.id)}
            />
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.totalLabel}>Toplam</Text>
            <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} ₺</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={styles.buyButton}
          >
            <Text style={styles.buyButtonText}>Satın Al</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  footer: {
    minHeight: 84,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DDDDDD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  totalLabel: {
    color: '#555555',
    fontSize: 12,
  },
  totalPrice: {
    marginTop: 4,
    color: '#171717',
    fontSize: 18,
    fontWeight: '700',
  },
  buyButton: {
    minWidth: 112,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E52B32',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default BasketPage;

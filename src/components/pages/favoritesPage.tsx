import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Nav from '../atoms/nav';
import type { RootStackParamList } from '../../navigation/types';
import { useStore } from '../../store/storeContext';
import HomeCardItem from '../molecules/homeCardItem/homeCardItem';
type FavoritesPageProps = NativeStackScreenProps<
  RootStackParamList,
  'Favorites'
>;

const FavoritesPage = ({ navigation }: FavoritesPageProps) => {
  const { favoriteProducts, toggleFavorite } = useStore();
  return (
    <View style={styles.container}>
      <Nav variant="favorites" onBackPress={navigation.goBack} />
      {favoriteProducts.length === 0 ? (
        <Text style={styles.emptyText}>Favori listeniz boş.</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <HomeCardItem
              title={item.title}
              description={item.description}
              price={item.price}
              imageSource={{ uri: item.images[0] }}
              isFavorite={true}
              onFavoritePress={() => toggleFavorite(item)}
              onDetailPress={() =>
                navigation.navigate('ProductDetail', {
                  productId: item.id,
                })
              }
            />
          )}
        />
      )}{' '}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  listContent: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default FavoritesPage;

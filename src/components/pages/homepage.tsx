import React, { useEffect, useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Nav from '../atoms/nav';
import SearchBar from '../atoms/searchBar/searchBar';
import HomeCardItem from '../molecules/homeCardItem/homeCardItem';
import FilterModal from '../molecules/filterModal/filterModal';
import { getProducts, type Product } from '../../services/productService';
import shuffleArray from '../../utils/shuffleArray';
import type { RootStackParamList } from '../../navigation/types';
import { useStore } from '../../store/storeContext';
type HomePageProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomePage = ({ navigation }: HomePageProps) => {
  const { toggleFavorite, isFavorite } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [minimumPrice, setMinimumPrice] = useState<number | null>(null);
  const [maximumPrice, setMaximumPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const productList = await getProducts();

        if (isMounted) {
          setProducts(shuffleArray(productList));
        }
      } catch {
        if (isMounted) {
          setError('Ürünler yüklenemedi. Lütfen tekrar deneyin.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const visibleProducts = useMemo(() => {
    const normalizedSearchText = debouncedSearchText.toLocaleLowerCase('tr-TR');

    return products.filter(product => {
      const matchesSearch =
        debouncedSearchText.length < 2 ||
        product.title.toLocaleLowerCase('tr-TR').includes(normalizedSearchText);
      const matchesMinimum =
        minimumPrice === null || product.price >= minimumPrice;
      const matchesMaximum =
        maximumPrice === null || product.price <= maximumPrice;

      return matchesSearch && matchesMinimum && matchesMaximum;
    });
  }, [debouncedSearchText, maximumPrice, minimumPrice, products]);

  const handleApplyFilter = (
    minimum: number | null,
    maximum: number | null,
  ) => {
    setMinimumPrice(minimum);
    setMaximumPrice(maximum);
    setFilterModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.centeredContent}>
        <ActivityIndicator color="#E52B32" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContent}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Nav
        variant="home"
        cartCount={0}
        onFavoritePress={() => navigation.navigate('Favorites')}
        onBasketPress={() => navigation.navigate('Basket')}
      />

      <View style={styles.searchSection}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onFilterPress={() => setFilterModalVisible(true)}
          filterActive={minimumPrice !== null || maximumPrice !== null}
        />

        {debouncedSearchText.length >= 2 && (
          <View style={styles.searchResultHeader}>
            <Text style={styles.searchResultTitle}>Bulunan Sonuçlar</Text>
            <Pressable onPress={() => setSearchText('')}>
              <Text style={styles.clearSearchText}>Aramayı Temizle</Text>
            </Pressable>
          </View>
        )}
      </View>

      <FlatList
        data={visibleProducts}
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
            isFavorite={isFavorite(item.id)}
            onFavoritePress={() => toggleFavorite(item)}
            onDetailPress={() =>
              navigation.navigate('ProductDetail', {
                productId: item.id,
              })
            }
          />
        )}
      />

      <FilterModal
        visible={filterModalVisible}
        minimumPrice={minimumPrice}
        maximumPrice={maximumPrice}
        onApply={handleApplyFilter}
        onClose={() => setFilterModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: '#E52B32',
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  searchResultTitle: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '600',
  },
  clearSearchText: {
    color: '#6C5CE7',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomePage;

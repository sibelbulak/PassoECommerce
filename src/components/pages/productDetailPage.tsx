import React, { useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Nav from '../atoms/nav';
import NumericInput from '../atoms/numericInput';
import type { RootStackParamList } from '../../navigation/types';
import { getProductById, type Product } from '../../services/productService';
import { useStore } from '../../store/storeContext';

type ProductDetailPageProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetailPage = ({ navigation, route }: ProductDetailPageProps) => {
  const { productId } = route.params;
  const { isFavorite, toggleFavorite, addToCart } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const productDetail = await getProductById(productId);

        if (isMounted) {
          setProduct(productDetail);
        }
      } catch {
        if (isMounted) {
          setError('Ürün detayı yüklenemedi.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.centeredContent}>
        <ActivityIndicator color="#E52B32" size="large" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centeredContent}>
        <Text style={styles.errorText}>{error ?? 'Ürün bulunamadı.'}</Text>
        <Pressable onPress={navigation.goBack}>
          <Text style={styles.backText}>Geri Dön</Text>
        </Pressable>
      </View>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[0] }}
            style={styles.productImage}
          />

          <View style={styles.navContainer}>
            <Nav
              variant="detail"
              isFavorite={isFavorite(product.id)}
              onBackPress={navigation.goBack}
              onFavoritePress={() => toggleFavorite(product)}
            />
          </View>
        </View>

        <View style={styles.productInformation}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.numericInputContainer}>
          <NumericInput
            value={quantity}
            onDecrease={() => setQuantity(current => current - 1)}
            onIncrease={() => setQuantity(current => current + 1)}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Toplam</Text>
          <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} ₺</Text>
        </View>

        <Pressable
          onPress={() => {
            addToCart(product, quantity);
            Alert.alert('Sepet', 'Ürün sepete eklendi.');
          }}
          style={styles.buyButton}
        >
          <Text style={styles.buyButtonText}>Satın Al</Text>
        </Pressable>
      </View>
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
  backText: {
    marginTop: 16,
    color: '#6C5CE7',
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  imageContainer: {
    height: 310,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  navContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  productInformation: {
    padding: 16,
  },
  title: {
    color: '#171717',
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    marginTop: 8,
    color: '#555555',
    fontSize: 15,
    lineHeight: 21,
  },
  numericInputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 24,
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

export default ProductDetailPage;

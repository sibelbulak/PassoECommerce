import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Badge from './badge';

type NavVariant = 'home' | 'detail' | 'basket' | 'favorites';

type NavProps = {
  variant: NavVariant;
  isFavorite?: boolean;
  cartCount?: number;
  onBackPress?: () => void;
  onFavoritePress?: () => void;
  onBasketPress?: () => void;
};

export default function Nav({
  variant,
  isFavorite = false,
  cartCount = 0,
  onBackPress,
  onFavoritePress,
  onBasketPress,
}: NavProps) {
  const showBackButton = variant !== 'home';
  const showFavoriteOnLeft = variant === 'home';
  const showFavoriteOnRight = variant === 'detail';
  const showBasketButton = variant === 'home';

  const title =
    variant === 'home'
      ? 'Passo E-Commerce'
      : variant === 'basket'
      ? 'Sepet'
      : variant === 'favorites'
      ? 'Favoriler'
      : undefined;

  const favoriteImage = isFavorite
    ? require('../../assets/png/filledHeart.png')
    : require('../../assets/png/emptyHeart.png');

  return (
    <View
      style={[styles.container, variant === 'detail' && styles.detailContainer]}
    >
      <View style={styles.leftSection}>
        {showBackButton ? (
          <Pressable
            accessibilityLabel="Geri"
            accessibilityRole="button"
            hitSlop={12}
            onPress={onBackPress}
          >
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
        ) : showFavoriteOnLeft ? (
          <Pressable
            accessibilityLabel="Favoriler"
            accessibilityRole="button"
            hitSlop={12}
            onPress={onFavoritePress}
          >
            <Image style={styles.image} source={favoriteImage} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.centerSection}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>

      <View style={styles.rightSection}>
        {showBasketButton ? (
          <Pressable
            accessibilityLabel="Sepet"
            accessibilityRole="button"
            hitSlop={12}
            onPress={onBasketPress}
            style={styles.iconButton}
          >
            <Image
              style={styles.image}
              source={require('../../assets/png/basket.png')}
            />
            <Badge count={cartCount} />
          </Pressable>
        ) : showFavoriteOnRight ? (
          <Pressable
            accessibilityLabel="Favorilere ekle"
            accessibilityRole="button"
            hitSlop={12}
            onPress={onFavoritePress}
          >
            <Image style={styles.image} source={favoriteImage} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backIcon: {
    color: '#242424',
    fontSize: 32,
    lineHeight: 34,
  },
  title: {
    color: '#171717',
    fontSize: 20,
    fontWeight: '600',
  },
  image: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

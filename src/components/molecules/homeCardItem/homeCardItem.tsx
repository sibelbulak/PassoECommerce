import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { HomeCardItemProps } from './type';
import styles from './style';

const HomeCardItem = ({
  title,
  description,
  imageSource,
  price,
  isFavorite,
  onFavoritePress,
  onDetailPress,
}: HomeCardItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />

        <Pressable
          accessibilityLabel={
            isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'
          }
          accessibilityRole="button"
          hitSlop={8}
          onPress={onFavoritePress}
          style={styles.favoriteButton}
        >
          <Image
            source={
              isFavorite
                ? require('../../../assets/png/filledHeart.png')
                : require('../../../assets/png/emptyHeart.png')
            }
            style={styles.favoriteIcon}
          />
        </Pressable>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{price.toFixed(2)} ₺</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={onDetailPress}
          style={styles.detailButton}
        >
          <Text style={styles.detailButtonText}>İncele</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeCardItem;

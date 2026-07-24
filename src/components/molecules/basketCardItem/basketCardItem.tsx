import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import NumericInput from '../../atoms/numericInput';
import styles from './style';
import type { BasketCardItemProps } from './type';

const BasketCardItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: BasketCardItemProps) => {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.image} />

      <View style={styles.information}>
        <Text style={styles.title}>{product.title}</Text>

        <Text numberOfLines={2} style={styles.description}>
          {product.description}
        </Text>

        <NumericInput
          value={quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{itemTotal.toFixed(2)} ₺</Text>

          <Pressable onPress={onRemove}>
            <Text style={styles.removeText}>Sil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BasketCardItem;

import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import styles from './style';
import type { FilterModalProps } from './type';

const FilterModal = ({
  visible,
  minimumPrice,
  maximumPrice,
  onApply,
  onClose,
}: FilterModalProps) => {
  const [minimumInput, setMinimumInput] = useState('');
  const [maximumInput, setMaximumInput] = useState('');
  const [error, setError] = useState('');

  const filterActive = minimumPrice !== null || maximumPrice !== null;

  useEffect(() => {
    if (visible) {
      setMinimumInput(minimumPrice?.toString() ?? '');
      setMaximumInput(maximumPrice?.toString() ?? '');
      setError('');
    }
  }, [maximumPrice, minimumPrice, visible]);

  const handleApply = () => {
    if (!minimumInput && !maximumInput) {
      setError('En az bir filtreleme yapmalısınız.');
      return;
    }

    const minimum = minimumInput ? Number(minimumInput) : null;
    const maximum = maximumInput ? Number(maximumInput) : null;

    if (minimum !== null && maximum !== null && minimum > maximum) {
      setError('En düşük fiyat, en yüksek fiyattan büyük olamaz.');
      return;
    }

    onApply(minimum, maximum);
  };

  const handleSecondaryButton = () => {
    if (filterActive) {
      onApply(null, null);
      return;
    }

    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => undefined}>
          <View style={styles.handle} />
          <Text style={styles.title}>Filtrele</Text>

          <TextInput
            keyboardType="numeric"
            onChangeText={setMinimumInput}
            placeholder="En Düşük Fiyat"
            style={styles.input}
            value={minimumInput}
          />
          <TextInput
            keyboardType="numeric"
            onChangeText={setMaximumInput}
            placeholder="En Yüksek Fiyat"
            style={styles.input}
            value={maximumInput}
          />

          {!!error && <Text style={styles.error}>●  {error}</Text>}

          <View style={styles.buttons}>
            <Pressable
              onPress={handleSecondaryButton}
              style={[styles.button, styles.secondaryButton]}
            >
              <Text style={styles.secondaryButtonText}>
                {filterActive ? 'Temizle' : 'Vazgeç'}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleApply}
              style={[styles.button, styles.primaryButton]}
            >
              <Text style={styles.primaryButtonText}>Filtrele</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;

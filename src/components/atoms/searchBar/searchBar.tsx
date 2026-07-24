import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import styles from './style';
import type { SearchBarProps } from './type';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Ara',
  onFilterPress,
  filterActive = false,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
      />
      <Pressable
        accessibilityLabel="Filtreleri aç"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onFilterPress}
        style={styles.filterButton}
      >
        <View style={styles.filterIcon}>
          <View style={styles.filterRow}>
            <View style={[styles.filterKnob, styles.firstKnob]} />
          </View>
          <View style={styles.filterRow}>
            <View style={[styles.filterKnob, styles.secondKnob]} />
          </View>
          <View style={styles.filterRow}>
            <View style={[styles.filterKnob, styles.thirdKnob]} />
          </View>
        </View>
        {filterActive && <View style={styles.activeBadge} />}
      </Pressable>
    </View>
  );
};

export default SearchBar;

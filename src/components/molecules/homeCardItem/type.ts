import type { ImageSourcePropType } from 'react-native';

export type HomeCardItemProps = {
  title: string;
  description: string;
  price: number;
  imageSource: ImageSourcePropType;
  isFavorite: boolean;
  onFavoritePress: () => void;
  onDetailPress: () => void;
};

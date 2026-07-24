import type { CartItem } from '../../../store/storeContext';

export type BasketCardItemProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

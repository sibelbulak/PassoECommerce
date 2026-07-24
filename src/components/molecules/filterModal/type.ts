export type FilterModalProps = {
  visible: boolean;
  minimumPrice: number | null;
  maximumPrice: number | null;
  onApply: (minimumPrice: number | null, maximumPrice: number | null) => void;
  onClose: () => void;
};

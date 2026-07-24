export type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  filterActive?: boolean;
};

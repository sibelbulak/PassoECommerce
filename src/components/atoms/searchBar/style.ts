import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#171717',
    fontSize: 16,
    paddingVertical: 0,
  },
  filterButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: {
    position: 'absolute',
    right: 1,
    bottom: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E52B32',
  },
  filterIcon: {
    width: 24,
    height: 24,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#171717',
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  filterRow: {
    width: 14,
    height: 2,
    marginHorizontal: 3,
    backgroundColor: '#171717',
  },
  filterKnob: {
    position: 'absolute',
    top: -2,
    width: 6,
    height: 6,
    borderWidth: 1,
    borderColor: '#171717',
    borderRadius: 3,
    backgroundColor: '#F5F5F5',
  },
  firstKnob: {
    left: 2,
  },
  secondKnob: {
    right: 2,
  },
  thirdKnob: {
    left: 5,
  },
});

export default styles;

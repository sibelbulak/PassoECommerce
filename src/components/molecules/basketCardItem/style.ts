import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    minHeight: 172,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#8B7CF6',
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 112,
    height: '100%',
    minHeight: 146,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  information: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#171717',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    minHeight: 36,
    marginTop: 6,
    marginBottom: 10,
    color: '#737373',
    fontSize: 12,
    lineHeight: 18,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '600',
  },
  removeText: {
    color: '#6C5CE7',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});

export default styles;

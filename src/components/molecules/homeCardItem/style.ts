import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 168,
    overflow: 'hidden',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
  },
  imageContainer: {
    position: 'relative', // görsel kalbi ve fiayt görselini beraber taşır
  },
  image: {
    width: '100%',
    height: 184,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute', // görselin üzerine taşır
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  priceContainer: {
    position: 'absolute',
    right: 16,
    bottom: 8,
    left: 16,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
  },
  priceText: {
    color: '#171717',
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    minHeight: 134,
    padding: 12,
    backgroundColor: '#F7F7F7',
  },
  title: {
    marginBottom: 8,
    color: '#171717',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    minHeight: 36,
    marginBottom: 10,
    color: '#737373',
    fontSize: 12,
    lineHeight: 18,
  },
  detailButton: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E52B32',
    borderRadius: 19,
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;

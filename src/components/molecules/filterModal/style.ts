import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  sheet: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  handle: {
    alignSelf: 'center',
    width: 96,
    height: 4,
    marginBottom: 20,
    borderRadius: 2,
    backgroundColor: '#171717',
  },
  title: {
    marginBottom: 24,
    color: '#E52B32',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    height: 54,
    marginBottom: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#FF676D',
    borderRadius: 10,
    color: '#171717',
  },
  error: {
    marginBottom: 20,
    color: '#E52B32',
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E52B32',
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#E52B32',
  },
  secondaryButtonText: {
    color: '#E52B32',
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default styles;

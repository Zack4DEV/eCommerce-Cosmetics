import { useColorScheme as _useColorScheme} from 'react-native';

/**
 * A hook that returns the current color scheme: 'light' or 'dark'.
 * Falls back to 'light' if the system preference is unavailable.
 */
export function useColorScheme(): 'light' | 'dark' {
  const systemScheme = _useColorScheme();
  return systemScheme === 'dark'? 'dark': 'light';
}
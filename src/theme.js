import { createTheme } from '@mui/material/styles';
import { elGR } from '@mui/x-date-pickers/locales';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    button: {
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    mono: {
      fontFamily: [
        'IBM Plex Mono',
        'Consolas',
        'Monaco',
        '"Andale Mono"',
        'monospace'
      ].join(','),
    }
  },
  palette: {
    primary: {
      main: 'rgb(5, 150, 105)',
      light: 'rgb(52, 211, 153)',
      dark: 'rgb(4, 120, 87)',
      contrastText: '#fff',
    },
    error: {
      main: '#ef4444',
      light: '#fee2e2',
      dark: '#b91c1c',
      contrastText: '#fff',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  elGR
});

export default theme; 
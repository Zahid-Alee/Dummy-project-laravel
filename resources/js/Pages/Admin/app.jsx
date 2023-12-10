/* eslint-disable perfectionist/sort-imports */
import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';
import './global.css';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

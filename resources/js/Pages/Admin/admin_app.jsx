/* eslint-disable perfectionist/sort-imports */
import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';
import './global.css';

// ----------------------------------------------------------------------

export default function SchooAdminApp() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router role={'school_admin'}  />
    </ThemeProvider>
  );
}

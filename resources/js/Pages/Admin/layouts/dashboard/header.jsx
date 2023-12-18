import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from '../../hooks/use-responsive';

import { bgBlur } from '../../theme/css';

import Iconify from '../../components/iconify';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';
import Dropdown from '@/Components/Dropdown';
import { FaUser } from 'react-icons/fa';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav, role }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>

      {/* {!lgUp && (
          <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
        )} */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Dropdown>
          <Dropdown.Trigger>
            <span className="inline-flex rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md-3 text-white dark:text-gray-400  hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
              >
                <strong style={{ color: "white" }}>
                  <span style={{ gap: "10px" }} className="flex">
                    <FaUser />
                  </span>
                </strong>
                <svg
                  className="ms-2 -me-0.5 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
            <Dropdown.Link href={route('logout')} method="get" as="button">
              Log Out
            </Dropdown.Link>
          </Dropdown.Content>
        </Dropdown>
      </Stack>
    </>
  );

  return (

    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        }}
      >

        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >

          {renderContent}
        </Toolbar>
      </AppBar>
    </>

  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

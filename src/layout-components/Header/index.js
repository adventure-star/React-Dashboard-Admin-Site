import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Hidden, IconButton, AppBar, Box, Tooltip } from '@material-ui/core';

import { connect } from 'react-redux';

import {
  setSidebarToggle,
  setSidebarToggleMobile
} from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/react.svg';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';
import HeaderSearch from '../../layout-components/HeaderSearch';
import HeaderMenu from '../../layout-components/HeaderMenu';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Header = props => {
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile,
    setSidebarToggle,
    sidebarToggle,
    userInfo,
  } = props;

  return (
    <Fragment>
      <AppBar
        color="secondary"
        className={clsx('app-header', {
          'app-header-collapsed-sidebar': props.isCollapsedLayout
        })}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box
              className="app-logo-wrapper"
              title="Carolina React Admin Dashboard with Material-UI PRO">
              <Link to="/AdminOverview" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn">
                  <img
                    className="app-logo-img"
                    alt="Carolina React Admin Dashboard with Material-UI PRO"
                    src={projectLogo}
                  />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">Carolina</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center">
              {!props.isCollapsedLayout && (
                <Box
                  className={clsx('btn-toggle-collapse', {
                    'btn-toggle-collapse-closed': sidebarToggle
                  })}>
                  <Tooltip title="Toggle Sidebar" placement="right">
                    <IconButton
                      color="inherit"
                      onClick={toggleSidebar}
                      size="medium"
                      className="btn-inverse">
                      {sidebarToggle ? (
                        <MenuRoundedIcon />
                      ) : (
                        <MenuOpenRoundedIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <HeaderMenu />
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center">
            <HeaderUserbox userInfo={userInfo}/>
            <Box className="toggle-sidebar-btn-mobile">
              <Tooltip title="Toggle Sidebar" placement="right">
                <IconButton
                  color="inherit"
                  onClick={toggleSidebarMobile}
                  size="medium">
                  {sidebarToggleMobile ? (
                    <MenuOpenRoundedIcon />
                  ) : (
                    <MenuRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggle: enable => dispatch(setSidebarToggle(enable)),
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

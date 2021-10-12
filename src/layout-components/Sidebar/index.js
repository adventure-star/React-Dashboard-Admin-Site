import React, { Fragment } from 'react';

import clsx from 'clsx';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, Drawer, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import SidebarHeader from 'layout-components/SidebarHeader';
import SidebarMenu from 'layout-components/SidebarMenu';
import navItems from './navItems';
import AdminNavItems from './AdminNavItems';
import UserNavItems from './UserNavItems';
import {
  setSidebarToggleMobile,
  setSidebarHover,
  setSidebarToggle,
  setSidebarFooter,
  setSidebarUserbox
} from 'reducers/ThemeOptions';

const Sidebar = props => {
  const {
    setSidebarToggleMobile,
    sidebarToggleMobile,
    sidebarFixed,

    sidebarHover,
    setSidebarHover,
    sidebarToggle,
    sidebarShadow,

    userInfo,
  } = props;

  const toggleHoverOn = () => setSidebarHover(true);
  const toggleHoverOff = () => setSidebarHover(false);

  const closeDrawer = () => setSidebarToggleMobile(!sidebarToggleMobile);

  const sidebarMenuContent = () => {
    const items = (userInfo && userInfo.value && userInfo.value.member) 
      ? (userInfo.value.member.is_superuser) 
        ? AdminNavItems
        : UserNavItems
      : navItems;

    return (
      <div
        className={clsx({
          'app-sidebar-nav-close': sidebarToggle && !sidebarHover
        })}>
        {items.map(list => (
          <SidebarMenu
            component="div"
            key={list.label}
            pages={list.content}
            title={list.label}
          />
        ))}
      </div>
    );
  };

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggleMobile}
          onClose={closeDrawer}
          variant="temporary"
          elevation={4}
          className="app-sidebar-wrapper-lg">
          <SidebarHeader />
          <PerfectScrollbar>
            {sidebarMenuContent()}
          </PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          onMouseEnter={toggleHoverOn}
          onMouseLeave={toggleHoverOff}
          className={clsx('app-sidebar-wrapper', {
            'app-sidebar-wrapper-close': sidebarToggle,
            'app-sidebar-wrapper-open': sidebarHover,
            'app-sidebar-wrapper-fixed': sidebarFixed
          })}
          square
          open={sidebarToggle}
          elevation={sidebarShadow ? 11 : 3}>
          <SidebarHeader />
          <div
            className={clsx({
              'app-sidebar-menu': sidebarFixed,
              'app-sidebar-collapsed': sidebarToggle && !sidebarHover
            })}>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              {sidebarMenuContent()}
            </PerfectScrollbar>
          </div>
        </Paper>
      </Hidden>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarHover: state.ThemeOptions.sidebarHover,
  sidebarShadow: state.ThemeOptions.sidebarShadow,
  sidebarFooter: state.ThemeOptions.sidebarFooter,
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable)),
  setSidebarToggle: enable => dispatch(setSidebarToggle(enable)),
  setSidebarHover: enable => dispatch(setSidebarHover(enable)),
  setSidebarFooter: enable => dispatch(setSidebarFooter(enable)),
  setSidebarUserbox: enable => dispatch(setSidebarUserbox(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

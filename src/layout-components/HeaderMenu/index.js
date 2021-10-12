import React, { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Grid,
  Box,
  Typography,
  Popover,
  Menu,
  Button,
  List,
  ListItem,
  Divider
} from '@material-ui/core';

import { Settings, Briefcase, Users, Layers } from 'react-feather';

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'mega-menu-popover' : undefined;

  return (
    <Fragment>
      <div className="app-header-menu">
        <Button
          size="medium"
          color="inherit"
          onClick={handleClick}
          className="btn-inverse font-size-xs mx-2">
          Mega menu
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className="popover-custom-xxl p-2">
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <div className="divider-v divider-v-lg" />
                <List className="nav-neutral-first flex-column p-2">
                  <Typography
                    color="primary"
                    component="div"
                    className="pb-2 text-capitalize font-size-lg font-weight-bold">
                    <span>Dashboards</span>
                  </Typography>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/DashboardAnalytics">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Analytics</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/DashboardReports">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Reports</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/DashboardRealEstate">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Real Estate</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/DashboardServerStatus">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Server Stats</span>
                    <div className="ml-auto badge badge-pill badge-success">
                      8
                    </div>
                  </ListItem>
                  <Divider className="my-3" />
                  <ListItem className="px-0 pb-0">
                    <Button
                      to="/AdminOverview"
                      color="primary"
                      size="small"
                      variant="outlined"
                      className="w-100">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <div className="divider-v divider-v-lg" />
                <List className="nav-neutral-success flex-column p-2">
                  <Typography
                    color="primary"
                    className="pb-2 text-capitalize font-size-lg font-weight-bold">
                    <span>Applications</span>
                  </Typography>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/ApplicationsCalendar">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Calendar</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/ApplicationsChat">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Chat</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/ApplicationsContacts">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Contacts</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/ApplicationsFileManager">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>File Manager</span>
                  </ListItem>
                  <Divider className="my-3" />
                  <ListItem className="px-0 pb-0">
                    <Button
                      to="/ApplicationsMail"
                      size="small"
                      color="primary"
                      variant="outlined"
                      className="w-100">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List className="nav-neutral-danger flex-column p-2">
                  <Typography
                    color="primary"
                    className="pb-2 text-capitalize font-size-lg font-weight-bold">
                    <span>Components</span>
                  </Typography>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/Cards4">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Cards examples</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/RegularTables2">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Tables</span>
                    <div className="ml-auto badge badge-pill badge-neutral-danger text-danger">
                      New
                    </div>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/FormsWizard">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Form wizards</span>
                  </ListItem>
                  <ListItem
                    button
                    className="rounded-sm"
                    component={Link}
                    to="/PricingTables">
                    <div className="nav-link-icon w-auto mr-2">
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className="font-size-xs opacity-3"
                      />
                    </div>
                    <span>Pricing tables</span>
                  </ListItem>
                  <Divider className="my-3" />
                  <ListItem className="px-0 pb-0">
                    <Button
                      to="/NavigationMenus"
                      color="primary"
                      size="small"
                      variant="outlined"
                      className="w-100">
                      <span className="btn-wrapper--label">Learn more</span>
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </div>
        </Popover>

        <Button
          href="/manage/AdminOverview"
          color="inherit"
          size="medium"
          className="btn-inverse font-size-xs mr-3">
          Dashboards
        </Button>
      </div>
    </Fragment>
  );
};

export default HeaderMenu;

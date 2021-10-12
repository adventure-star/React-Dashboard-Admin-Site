import React, { Fragment, useState } from 'react';

import {
  Grid,
  Fab,
  Container,
  InputAdornment,
  Drawer,
  IconButton,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Tooltip,
  TextField,
  Divider
} from '@material-ui/core';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';

import projectLogo from 'assets/images/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import svgImage11 from 'assets/images/illustrations/businesswoman.svg';
import hero6 from 'assets/images/hero-bg/hero-6.jpg';
import { connect } from 'react-redux';
import { getLocalToken } from 'services/apis/common';


const HomePage = (props) => {
  const [state, setState] = useState({
    right: false
  });
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <Fragment>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        <div className="header-nav-wrapper header-nav-wrapper-lg w-100 navbar-dark">
          <Container className="d-flex" fixed>
            <div className="header-nav-logo align-items-center d-flex justify-content-start">
              <div className="nav-logo">
                <Link
                  to="/Home"
                  title="Hatake Administrator">
                  
                    <img
                      alt="Hatake Administrator"
                      src={projectLogo}
                      className="app-logo-img-home"
                    />
                  
                  {/* <span>Hatake Game Administrator</span> */}
                </Link>
              </div>
            </div>
            <div className="header-nav-menu d-none d-lg-block">
              <div className="d-flex justify-content-center text-white">
                <Button
                  color="inherit"
                  className="btn-inverse px-3 mx-1 py-2 text-capitalize"
                  component={Link}
                  to="/AdminOverview">
                  Dashboards
                </Button>
              </div>
            </div>
            <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
              <span className="d-none d-lg-block">
                { !getLocalToken() &&
                    <Button
                      component={Link}
                      to="/Login"
                      className="px-3"
                      color="primary"
                      variant="contained">
                      Login
                    </Button>
                }
                
              </span>
              <span className="d-block d-lg-none">
                <Fab
                  onClick={toggleDrawer('right', true)}
                  color="secondary"
                  size="medium">
                  <MenuRoundedIcon />
                </Fab>
              </span>
            </div>
            <Drawer
              variant="temporary"
              anchor="right"
              open={state.right}
              onClose={toggleDrawer('right', false)}
              elevation={11}>
              <List className="py-0">
                <ListItem className="d-block bg-secondary py-2 px-3">
                  <div className="d-flex w-100 justify-content-between navbar-light align-content-center">
                    <div className="header-nav-logo justify-content-start">
                      <a
                        href="#/"
                        onClick={e => e.preventDefault()}
                        className="navbar-brand d-flex align-items-center d-40"
                        title="Hatake Administrator">
                        <img
                          alt="Hatake Administrator"
                          className="d-block img-fluid"
                          src={projectLogo}
                        />
                      </a>
                    </div>
                    <IconButton
                      onClick={toggleDrawer('right', false)}
                      color="primary">
                      <MenuRoundedIcon />
                    </IconButton>
                  </div>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/AdminOverview"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-deep-blue text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'object-group']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Dashboards
                        </div>
                        <span className="text-black-50">
                          12 different dashboards to choose from
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/ApplicationsChat"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-strong-bliss text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'sitemap']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Apps
                        </div>
                        <span className="text-black-50">
                          Multiple application designs included
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/Cards3"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-arielle-smile text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'shapes']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Cards
                        </div>
                        <span className="text-black-50">
                          Over 300 different cards available
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/RegularTables"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-happy-green text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'table']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Tables
                        </div>
                        <span className="text-black-50">
                          Multiple, easy to customise tables
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/FormsWizard"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-skim-blue text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'align-center']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Forms
                        </div>
                        <span className="text-black-50">
                          Over 50 forms elements included
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Button
                    href="/AdminOverview"
                    className="text-white w-100"
                    variant="contained"
                    color="secondary">
                    View Live Demo
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </Container>
        </div>

        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-9"
            style={{ backgroundImage: 'url(' + hero6 + ')' }}
          />
          <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
            <Container fixed className="pb-5">
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  lg={7}
                  xl={6}
                  className="d-flex align-items-center">
                  <div>
                    <div className="text-black mt-3">
                      <h1 className="display-2 mb-3 font-weight-bold">
                        Hatake Game Administrator
                      </h1>
                      <p className="font-size-lg text-black-50">
                        With this premium admin dashboard template you can
                        create intuitive products following Google&#39;s
                        Material Design specifications. Fully responsive and
                        powered by React and Material-UI components framework.
                      </p>
                      <p className="text-black">
                        Check out the live demo previews to see all the features
                        and components in action.
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={5}
                  xl={6}
                  className="px-0 d-none d-lg-flex align-items-center">
                  <img
                    alt="..."
                    className="w-100 mx-auto d-block img-fluid"
                    src={svgImage11}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
        <div className="hero-footer py-3 py-lg-5">
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Card className="card-box-hover-rise card-box-hover card-box-alt card-border-top border-success mb-4 p-3">
                  <h3 className="font-size-lg font-weight-bold mb-4">
                    Easy to understand
                  </h3>
                  <p className="card-text mb-0">
                    Clean code, no unnecessary complicated stuff, comments and
                    explanations along the way.
                  </p>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="card-box-hover-rise card-box-hover card-box-alt card-border-top border-first mb-4 p-3">
                  <h3 className="font-size-lg font-weight-bold mb-4">
                    Simple to use
                  </h3>
                  <p className="card-text mb-0">
                    Carolina has a modular architecture, which makes it a breeze
                    to implement and customise.
                  </p>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className="card-box-hover-rise card-box-hover card-box-alt card-border-top border-warning mb-4 p-3">
                  <h3 className="font-size-lg font-weight-bold mb-4">
                    Starter Templates
                  </h3>
                  <p className="card-text mb-0">
                    Together with the extensive documentation provided, you will
                    be up and ready in minutes.
                  </p>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <div className="py-4 bg-secondary">
        <Container fixed className="pb-4">
          <div className="text-center py-4">
            <h3 className="display-3 mb-2 font-weight-bold">What's included</h3>
            <p className="font-size-lg mb-5 text-black-50">
              Over 350+ elements, widgets and components at your disposal.
              Everything is developer friendly and highly customisable
            </p>
          </div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Card className="p-4 mb-4">
                <div className="card-badges">
                  <span className="shadow-none badge badge-success badge-pill">
                    200+
                  </span>
                </div>
                <div className="bg-grow-early text-center text-white font-size-xl d-50 rounded">
                  <FontAwesomeIcon icon={['fas', 'shapes']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">
                  UI Elements
                </h3>
                <p className="text-black-50 mt-2 mb-0">
                  Carolina features easy to use, easy to integrate user
                  interface elements, widgets and components. Over 200 UI comps
                  included.
                </p>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card className="p-4 mb-4">
                <div className="card-badges">
                  <span className="shadow-none badge badge-warning badge-pill">
                    30+
                  </span>
                </div>
                <div className="bg-ripe-malin text-center text-white font-size-xl d-50 rounded">
                  <FontAwesomeIcon icon={['fas', 'align-center']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">
                  Form widgets
                </h3>
                <p className="text-black-50 mt-2 mb-0">
                  Everything you need to get started, in terms of forms related
                  elements. Datepicker, slider, calendar and many others...
                </p>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card className="p-4 mb-4">
                <div className="card-badges">
                  <span className="shadow-none badge badge-first badge-pill">
                    5+
                  </span>
                </div>
                <div className="bg-malibu-beach text-center text-white font-size-xl d-50 rounded">
                  <FontAwesomeIcon icon={['fas', 'table']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">Tables</h3>
                <p className="text-black-50 mt-2 mb-0">
                  100% custom styled DataTables included. Also, we added a few
                  example of sortable tables, with various styles.
                </p>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card className="p-4 mb-4">
                <div className="card-badges">
                  <span className="shadow-none badge badge-danger badge-pill">
                    2
                  </span>
                </div>
                <div className="bg-arielle-smile text-center text-white font-size-xl d-50 rounded">
                  <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">Maps</h3>
                <p className="text-black-50 mt-2 mb-0">
                  We've included only the most popular solutions included
                  because we also don't want bloated code in our apps and sites.
                </p>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card className="p-4 mb-4">
                <div className="card-badges">
                  <span className="shadow-none badge badge-info badge-pill">
                    50+
                  </span>
                </div>
                <div className="bg-strong-bliss text-center text-white font-size-xl d-50 rounded">
                  <FontAwesomeIcon icon={['far', 'object-group']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">
                  Presentation blocks
                </h3>
                <p className="text-black-50 mt-2 mb-0">
                  Testimonials, pricing tables, hero sections and more. Built
                  with UX in mind, beautiful modern designs and always fully
                  responsive.
                </p>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card className="p-4 mb-4">
                <div className="card-badges">
                  <span className="shadow-none badge badge-dark badge-pill">
                    12
                  </span>
                </div>
                <div className="bg-plum-plate text-center text-white font-size-xl d-50 rounded">
                  <FontAwesomeIcon icon={['fas', 'sitemap']} />
                </div>
                <h3 className="font-size-lg font-weight-bold mt-4">
                  Landing pages
                </h3>
                <p className="text-black-50 mt-2 mb-0">
                  We put together some presentation blocks to create these
                  awesome landing pages. Create your own, with examples from
                  documentation.
                </p>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="bg-first py-5">
        <div>
          <Container maxWidth="md" className="text-center">
            <h1 className="display-3 mb-4 text-white font-weight-bold">
              Stay up to date
            </h1>
            <p className="font-size-lg text-white-50">
              Follow us on any of our social media accounts to find out when we
              release new products or updates.
            </p>
          </Container>
          <div className="divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-1 mx-auto mb-4 mt-5 w-50" />
          <div className="d-flex justify-content-center">
            <Tooltip arrow title="Facebook">
              <IconButton
                className="nav-link text-white-50"
                href="https:&#x2F;&#x2F;www.facebook.com&#x2F;UiFort"
                rel="noopener nofollow"
                target="_blank">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fab', 'facebook']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Twitter">
              <IconButton
                className="nav-link text-white-50"
                href="https:&#x2F;&#x2F;twitter.com&#x2F;uifort1"
                rel="noopener nofollow"
                target="_blank">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fab', 'twitter']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Instagram">
              <IconButton
                className="nav-link text-white-50"
                href="https:&#x2F;&#x2F;www.instagram.com&#x2F;uifort1"
                rel="noopener nofollow"
                target="_blank">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fab', 'instagram']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Discord">
              <IconButton
                className="nav-link text-white-50"
                href="https:&#x2F;&#x2F;discord.gg&#x2F;mddFBQX"
                rel="noopener nofollow"
                target="_blank">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fab', 'discord']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Dribbble">
              <IconButton
                className="nav-link text-white-50"
                href="https:&#x2F;&#x2F;dribbble.com&#x2F;UiFort"
                rel="noopener nofollow"
                target="_blank">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fab', 'dribbble']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Github">
              <IconButton
                className="nav-link text-white-50"
                href="https:&#x2F;&#x2F;github.com&#x2F;uifort"
                rel="noopener nofollow"
                target="_blank">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={['fab', 'github']}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
          </div>
          <div className="divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-1 mx-auto my-4 w-50" />
          <Container maxWidth="md" className="text-center">
            <Card className="mt-5 card-box">
              <CardContent className="p-3">
                <div className="text-black">
                  <h1 className="display-4 mb-3 font-weight-bold">
                    Newsletter updates
                  </h1>
                  <p className="font-size-md mb-4 text-black-50">
                    Subscribe to our newsletter to be the first to find out when
                    we offer promotions or discounts for our products.
                  </p>
                  <div id="mc_embed_signup">
                    <form
                      action="https://gmail.us3.list-manage.com/subscribe/post?u=3ebc33a3d37f2278158d74721&amp;id=a122e673aa"
                      className="validate"
                      id="mc-embedded-subscribe-form"
                      method="post"
                      name="mc-embedded-subscribe-form"
                      noValidate
                      target="_blank">
                      <Grid container spacing={4}>
                        <Grid xs={8} item>
                          <div id="mc_embed_signup_scroll">
                            <div className="mc-field-group">
                              <TextField
                                fullWidth
                                className="mt-0"
                                margin="dense"
                                id="mce-EMAIL"
                                name="EMAIL"
                                type="email"
                                variant="outlined"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MailOutlineTwoToneIcon />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </div>
                            <div className="clear" id="mce-responses">
                              <div
                                className="response"
                                id="mce-Errorresponse"
                                style={{ display: 'none' }}
                              />
                              <div
                                className="response"
                                id="mce-success-response"
                                style={{ display: 'none' }}
                              />
                            </div>
                            <div
                              aria-hidden="true"
                              style={{ position: 'absolute', left: '-5000px' }}>
                              <input
                                name="b_3ebc33a3d37f2278158d74721_a122e673aa"
                                tabIndex="-1"
                                type="text"
                              />
                            </div>
                          </div>
                        </Grid>
                        <Grid xs={4} item>
                          <Button
                            className="w-100"
                            color="primary"
                            variant="contained"
                            id="mc-embedded-subscribe"
                            name="subscribe"
                            type="submit">
                            <span className="btn-wrapper--label">Signup</span>
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                  <small className="text-black-50 d-block pt-3">
                    We promise not to spam your inbox. We also hate spam!
                  </small>
                </div>
              </CardContent>
            </Card>
          </Container>
          <div className="mt-5">
            <span className="text-center d-block text-white-50">
              Copyright &copy; 2020 -{' '}
              <a
                className="text-white"
                href="https://uifort.com"
                title="UiFort">
                UiFort.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

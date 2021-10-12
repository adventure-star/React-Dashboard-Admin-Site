import React, { lazy, Suspense, Fragment, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import { ClipLoader } from 'react-spinners';

import MuiTheme from './theme';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { UserActions } from 'actions';

// Layout Blueprints

import {
  LeftSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';

import PagesLogin from './example-pages/PagesLogin';
import PagesRegister from './example-pages/PagesRegister';
import PagesRecoverPassword from './example-pages/PagesRecoverPassword';
import PagesError404 from './example-pages/PagesError404';
import PagesError500 from './example-pages/PagesError500';
import PagesError505 from './example-pages/PagesError505';
import PrivateSuperUserRoute from 'example-components/PrivateSuperUserRoute';
import PrivateGeneralUserRoute from 'example-components/PrivateGeneralUserRoute';
import LoginRoute from 'example-components/LoginRoute';
import { getLocalToken } from 'services/apis/common';


const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));

const SuperUserDashboard = lazy(() => import('./pages/AdminDashboard/Overview'));

const AdminActionMaster = lazy(() => import('./pages/AdminDashboard/ActionMaster/List'));
const AdminActionMasterAdd = lazy(() => import('./pages/AdminDashboard/ActionMaster/Add'));
const AdminActionMasterModify = lazy(() => import('./pages/AdminDashboard/ActionMaster/Modify'));

const AdminConfigs = lazy(() => import('./pages/AdminDashboard/Config/List'));
const AdminConfigAdd = lazy(() => import('./pages/AdminDashboard/Config/Add'));
const AdminConfigModify = lazy(() => import('./pages/AdminDashboard/Config/Modify'));

const AdminCropMaster = lazy(() => import('./pages/AdminDashboard/CropMaster/List'));
const AdminCropMasterAdd = lazy(() => import('./pages/AdminDashboard/CropMaster/Add'));
const AdminCropMasterModify = lazy(() => import('./pages/AdminDashboard/CropMaster/Modify'));
const AdminCropMasterActionAdd = lazy(() => import('./pages/AdminDashboard/CropMaster/Modify/components/ActionAddForm'));
const AdminCropMasterActionModify = lazy(() => import('./pages/AdminDashboard/CropMaster/Modify/components/ActionModifyForm'));

const AdminEnums = lazy(() => import('./pages/AdminDashboard/Enum/List'));
const AdminEnumAdd = lazy(() => import('./pages/AdminDashboard/Enum/Add'));
const AdminEnumDetail = lazy(() => import('./pages/AdminDashboard/Enum/Detail'));
const AdminEnumDetailAdd = lazy(() => import('./pages/AdminDashboard/Enum/DetailAdd'));
const AdminEnumDetailModify = lazy(() => import('./pages/AdminDashboard/Enum/DetailModify'));

const AdminEvents = lazy(() => import('./pages/AdminDashboard/Event/List'));
const AdminEventAdd = lazy(() => import('./pages/AdminDashboard/Event/Add'));
const AdminEventModify = lazy(() => import('./pages/AdminDashboard/Event/Modify'));
const AdminEventChildAdd = lazy(() => import('./pages/AdminDashboard/Event/ChildAdd'));

const AdminInvoices = lazy(() => import('./pages/AdminDashboard/Invoice/List'));
const AdminInvoiceWaitList = lazy(() => import('./pages/AdminDashboard/Invoice/WaitList'));
const AdminInvoiceAdd = lazy(() => import('./pages/AdminDashboard/Invoice/Add'));
const AdminInvoiceModify = lazy(() => import('./pages/AdminDashboard/Invoice/Modify'));

const AdminItemMaster = lazy(() => import('./pages/AdminDashboard/ItemMaster/List'));
const AdminItemMasterAdd = lazy(() => import('./pages/AdminDashboard/ItemMaster/Add'));
const AdminItemMasterModify = lazy(() => import('./pages/AdminDashboard/ItemMaster/Modify'));

const AdminMembers = lazy(() => import('./pages/AdminDashboard/Member/List'));
const AdminMemberAdd = lazy(() => import('./pages/AdminDashboard/Member/Add'));
const AdminMemberSearch = lazy(() => import('./pages/AdminDashboard/Member/Search'));
const AdminMemberModify = lazy(() => import('./pages/AdminDashboard/Member/Modify'));

const AdminNews = lazy(() => import('./pages/AdminDashboard/News/List'));
const AdminNewsAdd = lazy(() => import('./pages/AdminDashboard/News/Add'));
const AdminNewsModify = lazy(() => import('./pages/AdminDashboard/News/Modify'));
const AdminNewsChildPageAdd = lazy(() => import('./pages/AdminDashboard/News/ChildPageAdd'));

const AdminRegions = lazy(() => import('./pages/AdminDashboard/Region/List'));
const AdminRegionAdd = lazy(() => import('./pages/AdminDashboard/Region/Add'));
const AdminRegionModify = lazy(() => import('./pages/AdminDashboard/Region/Modify'));

const GeneralUserDashboard = lazy(() => import('./pages/UserDashboard/Overview'));

const UserCropMaster = lazy(() => import('./pages/UserDashboard/CropMaster/List'));
const UserCropMasterAdd = lazy(() => import('./pages/UserDashboard/CropMaster/Add'));
const UserCropMasterModify = lazy(() => import('./pages/UserDashboard/CropMaster/Modify'));

const UserFarmerMaster = lazy(() => import('./pages/UserDashboard/FarmerMaster'));

const UserInvoices = lazy(() => import('./pages/UserDashboard/Invoice/List'));
const UserInvoiceAdd = lazy(() => import('./pages/UserDashboard/Invoice/Add'));
const UserInvoiceModify = lazy(() => import('./pages/UserDashboard/Invoice/Modify'));

const UserProfile = lazy(() => import('./pages/UserDashboard/Profile'));


const Routes = (props) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  useEffect(() => {

    props.userActions && props.userActions.setUser(getLocalToken());

  }, []);


  const SuspenseLoading = () => {
    return (
      <Fragment>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ClipLoader color={'var(--primary)'} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            Please wait while we load the page
            <span className="font-size-lg d-block text-dark">
              This live preview instance can be slower than a real production
              build!
            </span>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Redirect exact from="/" to="/Home" />
            <Route path={['/Home']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/Home" component={Home} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>
            <Route
              path={[
                '/Login'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <LoginRoute path="/Login" component={Login} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>
            <Route
              path={[
                '/PagesLogin',
                '/PagesRegister',
                '/PagesRecoverPassword',
                '/PagesError404',
                '/PagesError500',
                '/PagesError505'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/PagesLogin" component={PagesLogin} />
                    <Route path="/PagesRegister" component={PagesRegister} />
                    <Route
                      path="/PagesRecoverPassword"
                      component={PagesRecoverPassword}
                    />
                    <Route path="/PagesError404" component={PagesError404} />
                    <Route path="/PagesError500" component={PagesError500} />
                    <Route path="/PagesError505" component={PagesError505} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>

            <Route
              path={[
                '/AdminOverview',
                '/AdminActionMaster',
                '/AdminActionMasterAdd',
                '/AdminActionMasterModify',
                '/AdminConfigs',
                '/AdminConfigAdd',
                '/AdminConfigModify',
                '/AdminCropMaster',
                '/AdminCropMasterAdd',
                '/AdminCropMasterModify',
                '/AdminCropMasterActionAdd',
                '/AdminCropMasterActionModify',
                '/AdminEnums',
                '/AdminEnumAdd',
                '/AdminEnumDetail',
                '/AdminEnumDetailAdd',
                '/AdminEnumDetailModify',
                '/AdminEvents',
                '/AdminEventAdd',
                '/AdminEventModify',
                '/AdminEventChildAdd',
                '/AdminInvoices',
                '/AdminInvoiceWaitList',
                '/AdminInvoiceAdd',
                '/AdminInvoiceModify',
                '/AdminItemMaster',
                '/AdminItemMasterAdd',
                '/AdminItemMasterModify',
                '/AdminMembers',
                '/AdminNews',
                '/AdminNewsAdd',
                '/AdminNewsModify',
                '/AdminNewsChildPageAdd',
                '/AdminRegions',
                '/AdminRegionAdd',
                '/AdminRegionModify',
                '/AdminMemberAdd',
                '/AdminMemberSearch',
                '/AdminMemberModify'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <PrivateSuperUserRoute
                      path="/AdminOverview"
                      component={SuperUserDashboard}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminMembers"
                      component={AdminMembers}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminMemberAdd"
                      component={AdminMemberAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminMemberSearch"
                      component={AdminMemberSearch}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminMemberModify"
                      component={AdminMemberModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminNewsChildPageAdd"
                      component={AdminNewsChildPageAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminActionMaster"
                      component={AdminActionMaster}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminActionMasterAdd"
                      component={AdminActionMasterAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminActionMasterModify"
                      component={AdminActionMasterModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminConfigs"
                      component={AdminConfigs}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminConfigAdd"
                      component={AdminConfigAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminConfigModify"
                      component={AdminConfigModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminCropMaster"
                      component={AdminCropMaster}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminCropMasterAdd"
                      component={AdminCropMasterAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminCropMasterModify"
                      component={AdminCropMasterModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminCropMasterActionAdd"
                      component={AdminCropMasterActionAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminCropMasterActionModify"
                      component={AdminCropMasterActionModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEnums"
                      component={AdminEnums}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEnumAdd"
                      component={AdminEnumAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEnumDetail"
                      component={AdminEnumDetail}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEnumDetailAdd"
                      component={AdminEnumDetailAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEnumDetailModify"
                      component={AdminEnumDetailModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEvents"
                      component={AdminEvents}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEventAdd"
                      component={AdminEventAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEventModify"
                      component={AdminEventModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminEventChildAdd"
                      component={AdminEventChildAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminInvoices"
                      component={AdminInvoices}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminInvoiceWaitList"
                      component={AdminInvoiceWaitList}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminInvoiceAdd"
                      component={AdminInvoiceAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminInvoiceModify"
                      component={AdminInvoiceModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminItemMaster"
                      component={AdminItemMaster}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminItemMasterAdd"
                      component={AdminItemMasterAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminItemMasterModify"
                      component={AdminItemMasterModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminNews"
                      component={AdminNews}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminNewsAdd"
                      component={AdminNewsAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminNewsModify"
                      component={AdminNewsModify}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminRegions"
                      component={AdminRegions}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminRegionAdd"
                      component={AdminRegionAdd}
                    />
                    <PrivateSuperUserRoute
                      path="/AdminRegionModify"
                      component={AdminRegionModify}
                    />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
            <Route
              path={[
                '/UserOverview',
                '/UserCropMaster',
                '/UserCropMasterAdd',
                '/UserCropMasterModify',
                '/UserFarmerMaster',
                '/UserInvoices',
                '/UserInvoiceAdd',
                '/UserInvoiceModify',
                '/UserProfile',
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>

                    <PrivateGeneralUserRoute
                      path="/UserOverview"
                      component={GeneralUserDashboard}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserCropMaster"
                      component={UserCropMaster}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserCropMasterAdd"
                      component={UserCropMasterAdd}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserCropMasterModify"
                      component={UserCropMasterModify}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserFarmerMaster"
                      component={UserFarmerMaster}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserInvoices"
                      component={UserInvoices}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserInvoiceAdd"
                      component={UserInvoiceAdd}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserInvoiceModify"
                      component={UserInvoiceModify}
                    />
                    <PrivateGeneralUserRoute
                      path="/UserProfile"
                      component={UserProfile}
                    />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

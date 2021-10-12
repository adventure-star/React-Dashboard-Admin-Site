import React, { Fragment, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { getLocalToken } from 'services/apis/common';

const Home = lazy(() => import('../../pages/Home'));

const LoginRoute = (props) => {
  return (
    <>
      { (getLocalToken() == null) && 
          <Route
              path={props.path}
              component={props.component}
          />
      }
      { (getLocalToken() !== null) && 
          <Redirect
            to={{
              pathname: "/Home",
              state: { from: props.location }
            }}
          />
      }
    </>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRoute);

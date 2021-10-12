import React, { Fragment, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

const PrivateSuperUserRoute = (props) => {
    var value = props.userInfo.value ?? "null";
    var member = value.member ?? "member";
    return (
      <>
        { (member == "member") &&
            <Redirect
                to={{
                pathname: "/Login",
                state: { from: props.location }
                }}
            />
        }
        { (member !== "member") && 
            <>
                { (member.is_superuser !== null) && 
                    <Route
                        path={props.path}
                        component={props.component}
                    />
                }
                { (member.is_superuser == null) &&
                    <Redirect
                    to={{
                        pathname: "/UserOverview",
                        state: { from: props.location }
                    }}
                    />
                }
            </>
        }
        

      </>
    );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateSuperUserRoute);

import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import HeaderHome from 'components/HeaderSections/HeaderHome';
import FooterSection from 'components/FooterSection';
import PagesLoginContent from 'components/PagesLogin/PagesLoginContent';
import { loginWithAPI } from 'services/apis/auth';
import { UserActions } from 'actions';

const LoginPage = (props) => {
  const onLogin = (userInfo) => {
    const data = {
      mail_address: userInfo.email,
      password: userInfo.password
    }
    loginWithAPI(data)
    .then(res => {
      props.userActions && props.userActions.setUser(res);
      if(res && res.member) {
        const { member } = res;
        if(member.is_superuser) props.history.push('/AdminOverview');
        else props.history.push('/UserOverview');
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log('===== error: ', error);
      // ...
    });
  };

  return (
    <Fragment>
      <PagesLoginContent onLoginClick={onLogin}/>
      <FooterSection />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

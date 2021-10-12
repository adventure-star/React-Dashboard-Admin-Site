import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import UserProfileForm from './components/UserProfileForm';
import MemberDetail from './components/MemberDetail';

function Profile (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Members"
        titleDescription="This page show all members."
      />
      <UserProfileForm />
      <MemberDetail />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

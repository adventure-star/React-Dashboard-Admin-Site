import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import ModifyForm from './components/ModifyForm';
import MemberDetail from './components/MemberDetail';

function Modify (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Members"
        titleDescription="This page show all members."
      />
      <ModifyForm />
      <MemberDetail />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Modify);

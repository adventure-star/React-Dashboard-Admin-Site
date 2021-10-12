import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import ModifyForm from './components/ModifyForm';

function Modify (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="ItemMasters"
        titleDescription="This page show all itemmasters."
      />
      <ModifyForm />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Modify);

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import ModifyForm from './components/ModifyForm';

function DetailModify (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Enums"
        titleDescription="This page show all enums."
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailModify);

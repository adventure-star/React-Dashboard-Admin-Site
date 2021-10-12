import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import AddForm from './components/AddForm';

function Add (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Invoices"
        titleDescription="This page show all invoices."
      />
      <AddForm />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);

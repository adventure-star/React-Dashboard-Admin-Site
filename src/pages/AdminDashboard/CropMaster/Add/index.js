import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import AddForm from './components/AddForm';
import PestListTable from './components/PestListTable';
import { StepButton } from '@material-ui/core';
import HashTable from './components/HashTable';
import ActionTable from './components/ActionTable';

function Add (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="CropMasters"
        titleDescription="This page show all cropmasters."
      />
      <AddForm />
      <ActionTable />
      <HashTable />
      <PestListTable />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);

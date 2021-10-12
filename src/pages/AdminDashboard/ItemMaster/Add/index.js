import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import AddForm from './components/AddForm';

function Add (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="ItemMasters"
        titleDescription="This page show all itemmasters."
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

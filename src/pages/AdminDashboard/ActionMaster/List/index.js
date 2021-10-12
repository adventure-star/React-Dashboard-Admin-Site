import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import DetailTable from './components/DetailTable';

function List (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="ActionMasters"
        titleDescription="This page show all actionmasters."
      />
      <DetailTable />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(List);

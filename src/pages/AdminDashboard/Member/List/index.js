import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import DetailTable from './components/DetailTable';

function List (props) {

  return (
    <Fragment>
      <PageTitle
        titleHeading="Members"
        titleDescription="This page show all members."
      />
      <DetailTable keywords={props.location.state}/>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(List);

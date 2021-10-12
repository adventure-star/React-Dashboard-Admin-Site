import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import DetailTable from './components/DetailTable';

function Detail (props) {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Enums"
        titleDescription="This page show all enums."
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail);

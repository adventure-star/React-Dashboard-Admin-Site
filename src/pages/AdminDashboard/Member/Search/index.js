import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import SearchForm from './components/SearchForm';

function Search (props) {

  return (
    <Fragment>
      <PageTitle
        titleHeading="Members"
        titleDescription="This page show all members."
      />
      <SearchForm />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);

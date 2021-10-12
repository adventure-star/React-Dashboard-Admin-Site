import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import FarmDataTable from './components/FarmDataTable';
import CropDataTable from './components/CropDataTable';

function AdminFarmerMasters (props) {

  localStorage.setItem("memberId", props.userInfo.value.member.id);

  return (
    <Fragment>
      <PageTitle
        titleHeading="FarmerMasters"
        titleDescription="This page show all farmermasters."
      />
      <FarmDataTable id={localStorage.getItem("memberId")}/>
      <br />
      <CropDataTable id={localStorage.getItem("memberId")}/>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminFarmerMasters);

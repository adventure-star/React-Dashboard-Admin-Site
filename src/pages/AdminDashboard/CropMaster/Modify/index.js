import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'layout-components';
import ModifyForm from './components/ModifyForm';
import { useLocation } from 'react-router';
import SubForm from './components/SubForm';
import PestListTable from './components/PestListTable';
import HashTable from './components/HashTable';
import ActionTable from './components/ActionTable';

function Modify (props) {

  let data = useLocation();

  let cropMasterId = data.state !== undefined ? data.state.id : localStorage.getItem("cropMasterId");

  useEffect(() => {

    localStorage.setItem("cropMasterId", cropMasterId);

  }, []);

  return (
    <Fragment>
      <PageTitle
        titleHeading="CropMasters"
        titleDescription="This page show all cropmasters."
      />
      <ModifyForm id={cropMasterId}/>
      <SubForm id={cropMasterId}/>
      <ActionTable />
      <HashTable id={cropMasterId} />
      <PestListTable id={cropMasterId}/>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Modify);

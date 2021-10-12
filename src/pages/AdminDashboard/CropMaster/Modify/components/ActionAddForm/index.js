import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';

import OneInputText from 'components/OneInputText';
import OneInputTextSmall from 'components/OneInputTextSmall';
import NormalButton from 'components/NormalButton';
import ActionDropDown from 'components/ActionDropDown';
import { apiCreateActionMaster } from 'services/apis/actionmasters';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import SaveModal from 'components/SaveModal';


function ActionAddForm(props) {

  let history = useHistory();

  const [cropid, setCropId] = useState(localStorage.getItem("cropMasterId"));

  const [phaseid, setPhaseId] = useState("");
  const handlePhaseId = event => {
    setPhaseId(event.target.value);
  };

  const [actionid, setActionId] = useState("");
  const handleActionId = event => {
    setActionId(event.target.value);
  };

  const [actiontype, setActionType] = useState("");
  const handleActionType = event => {
    setActionType(event.target.value);
  };

  const [name, setName] = useState("");
  const handleName = event => {
    setName(event.target.value);
  };

  const [conditionstartdate, setConditionStartDate] = useState("");
  const handleConditionStartDate = event => {
    setConditionStartDate(event.target.value);
  };

  const [conditionenddate, setConditionEndDate] = useState("");
  const handleConditionEndDate = event => {
    setConditionEndDate(event.target.value);
  };

  const [preactionconditions, setPreActionConditions] = useState("");
  const handlePreActionConditions = event => {
    setPreActionConditions(event.target.value);
  };

  const [postactionconditions, setPostActionConditions] = useState("");
  const handlePostActionConditions = event => {
    setPostActionConditions(event.target.value);
  };

  const [centralexecutiondate, setCentralExecutionDate] = useState("");
  const handleCentralExecutionDate = event => {
    setCentralExecutionDate(event.target.value);
  };

  const [nextphase, setNextPhase] = useState("");
  const handleNextPhase = event => {
    setNextPhase(event.target.value);
  };

  const onCreateActionMaster = () => {

    toggle();

    var data = {
      crop_id: cropid,
      phase_id: phaseid,
      action_id: actionid,
      action_type: actiontype,
      name: name,
      start_day: conditionstartdate,
      limit_day: conditionenddate,
      before_action_id: preactionconditions,
      after_action_id: postactionconditions,
      sweet_day: centralexecutiondate,
      next_phase: nextphase
    }
    console.log(data);

    apiCreateActionMaster(data)
      .then(res => {
        if (res) {
          history.push('/AdminCropMasterModify', {id: localStorage.getItem("cropMasterId")})
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Add New ActionMaster</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="作物ID" value={cropid} />
        <OneInputText label="フェーズID" value={phaseid} changeAction={handlePhaseId} type="number" />
        <OneInputText label="アクションID" value={actionid} changeAction={handleActionId} type="number" />
        <OneInputText label="アクション種別" value={actiontype} changeAction={handleActionType} type="number" />
        <OneInputText label="名称" value={name} changeAction={handleName} />
        <OneInputText label="条件開始日" value={conditionstartdate} changeAction={handleConditionStartDate} type="number" />
        <OneInputText label="条件終了日" value={conditionenddate} changeAction={handleConditionEndDate} type="number" />
        <OneInputText label="事前アクション条件" value={preactionconditions} changeAction={handlePreActionConditions} type="number" />
        <OneInputText label="事後アクション条件" value={postactionconditions} changeAction={handlePostActionConditions} type="number" />
        <OneInputText label="中心実行日" value={centralexecutiondate} changeAction={handleCentralExecutionDate} type="number" />
        <OneInputText label="次フェーズ" value={nextphase} changeAction={handleNextPhase} type="number" />
      </div>
      <div>
        <NormalButton label="更　新" onClick={toggle} />
        <Link to={{ pathname: "/AdminCropMasterModify", state: { id: localStorage.getItem("cropMasterId") } }}>
          <NormalButton label="戻　る" />
        </Link>
        <SaveModal state={modal} onNo={toggle} onYes={onCreateActionMaster} />
      </div>
    </Card>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ActionAddForm);

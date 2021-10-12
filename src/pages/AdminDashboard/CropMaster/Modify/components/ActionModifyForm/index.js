import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';

import OneInputText from 'components/OneInputText';
import OneInputTextSmall from 'components/OneInputTextSmall';
import NormalButton from 'components/NormalButton';
import { useLocation, useHistory } from 'react-router';
import { apiActionMasterById, apiUpdateActionMaster, apiDeleteActionMasterById } from 'services/apis/actionmasters';
import ActionDropDown from 'components/ActionDropDown';
import { Link } from 'react-router-dom';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';


function ActionModifyForm() {

  let data = useLocation();

  let actionmasterId = data.state !== undefined ? data.state.id : localStorage.getItem("actionmasterId");

  let history = useHistory();

  const [cropid, setCropId] = useState("");

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

  useEffect(() => {

    localStorage.setItem("actionmasterId", actionmasterId);

    getActionMaster();

  }, []);

  const getActionMaster = async () => {

    const res = await apiActionMasterById(localStorage.getItem("actionmasterId"));

    setCropId(res.crop_id);
    setPhaseId(res.phase_id);
    setActionId(res.action_id);
    setActionType(res.action_type);
    setName(res.name);
    setConditionStartDate(res.start_day);
    setConditionEndDate(res.limit_day);
    setPreActionConditions(res.before_action_id);
    setPostActionConditions(res.after_action_id);
    setCentralExecutionDate(res.sweet_day);
    setNextPhase(res.next_phase);

    console.log(res);

  }

  const onModifyActionMaster = () => {

    updatetoggle();

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

    apiUpdateActionMaster(localStorage.getItem("actionmasterId"), data)
      .then(res => {
        if (res) {
          history.push('/AdminCropMasterModify', { id: localStorage.getItem("cropMasterId") })
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  }

  const onDeleteActionMaster = () => {

    deletetoggle();

    apiDeleteActionMasterById(localStorage.getItem("actionmasterId"))
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    history.push('/AdminCropMasterModify', { id: localStorage.getItem("cropMasterId") });

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);
  const [deletemodal, setDeleteModal] = useState(false);
  const deletetoggle = () => setDeleteModal(!deletemodal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Modify ActionMaster</div>
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
        <OneInputText label="中心実行日" value={centralexecutiondate} changeAction={handleCentralExecutionDate} />
        <OneInputText label="次フェーズ" value={nextphase} changeAction={handleNextPhase} type="number" />
      </div>
      <div>
        <NormalButton label="更　新" onClick={updatetoggle} />
        <NormalButton label="削　除" onClick={deletetoggle} />
        <Link to={{ pathname: "/AdminCropMasterModify", state: { id: localStorage.getItem("cropMasterId") } }}>
          <NormalButton label="戻　る" />
        </Link>
        <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onModifyActionMaster} />
        <DeleteModal state={deletemodal} onNo={deletetoggle} onYes={onDeleteActionMaster} />
      </div>
    </Card>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ActionModifyForm);

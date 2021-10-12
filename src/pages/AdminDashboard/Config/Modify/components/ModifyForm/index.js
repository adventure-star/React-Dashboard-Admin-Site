import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';
import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { apiConfigById, apiUpdateConfig, apiDeleteConfig } from 'services/apis/configs';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';
import LongTextArea from 'components/LongTextArea';

function ModifyForm() {

  let data = useLocation();

  let configId = data.state !== undefined ? data.state.id : localStorage.getItem("configId");

  let history = useHistory();

  const [keyvalue, setKeyValue] = useState("");

  const [description, setDescription] = useState("");
  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const [value, setValue] = useState("");
  const handleValue = event => {
    setValue(event.target.value);
  };

  const [displayorder, setDisplayOrder] = useState("");
  const handleDisplayOrder = event => {
    setDisplayOrder(event.target.value);
  };

  useEffect(() => {

    localStorage.setItem("configId", configId);

    getConfig();

  }, []);

  const getConfig = async () => {

    const res = await apiConfigById(localStorage.getItem("configId"));

    setKeyValue(res.key);
    setDescription(res.description);
    setValue(res.value);
    setDisplayOrder(res.view_weight);

    console.log(res);

  };

  const onUpdateConfig = () => {

    updatetoggle();

    var data = {
      key: keyvalue,
      value: value,
      description: description,
      view_weight: displayorder
    }
    console.log(data);

    apiUpdateConfig(localStorage.getItem("configId"), data)
      .then(res => {
        console.log(res);
        if (res) {
          history.push('/AdminConfigs')
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  }

  const onDeleteConfig = () => {
    
    deletetoggle();
    
    apiDeleteConfig(localStorage.getItem("configId"))
      .then(res => {
        console.log(res);
        if (res) {
          // history.push('/AdminConfigs')
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    history.push('/AdminConfigs')

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);
  const [deletemodal, setDeleteModal] = useState(false);
  const deletetoggle = () => setDeleteModal(!deletemodal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Modify Config</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="キー値" value={keyvalue} disabled/>
        <OneInputText label="説明" value={description} changeAction={handleDescription} />
        <LongTextArea label="値" value={value} changeAction={handleValue} />
        <OneInputText label="表示順" value={displayorder} changeAction={handleDisplayOrder} type="number" />
      </div>
      <div>
        <NormalButton label="更　新" onClick={updatetoggle} />
        <NormalButton label="削　除" onClick={deletetoggle} />
        <Link to="/AdminConfigs">
          <NormalButton label="戻　る" />
        </Link>
        <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onUpdateConfig} />
        <DeleteModal state={deletemodal} onNo={deletetoggle} onYes={onDeleteConfig} />
      </div>
    </Card>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);

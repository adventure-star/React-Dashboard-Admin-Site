import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';

import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import { apiEnumDetailById, apiUpdateEnum, apiDeleteEnumById } from 'services/apis/enums';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';
import TextArea from 'components/TextArea';

function ModifyForm() {

  let data = useLocation();

  let detailId = data.state !== undefined ? data.state.id : localStorage.getItem("detailId");

  let history = useHistory();

  const [enumId, setEnumId] = useState("");

  const [value, setValue] = useState("");
  const handleValue = event => {
    setValue(event.target.value);
  };

  const [name, setName] = useState("");
  const handleName = event => {
    setName(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const [displayweight, setDisplayWeight] = useState("");
  const handleDisplayWeight = event => {
    setDisplayWeight(event.target.value);
  };

  const [status, setStatus] = useState("");
  const handleStatus = event => {
    setStatus(event.target.value);
  };

  useEffect(() => {

    detailId = data.state !== undefined ? data.state.id : localStorage.getItem("detailId");

    localStorage.setItem("detailId", detailId);

    getDetail();

  }, []);

  const getDetail = async () => {

    const res = await apiEnumDetailById(localStorage.getItem("detailId"));

    setEnumId(res.enum_id);
    setValue(res.value);
    setName(res.name);
    setDescription(res.description);
    setDisplayWeight(res.view_weight);
    setStatus(res.status);

  }

  const onEnumItemModify = () => {

    updatetoggle();

    var data = {
      id: detailId,
      enum_id: enumId,
      value: value,
      name: name,
      description: description,
      view_weight: displayweight,
      status: status
    }
    console.log(data);

    apiUpdateEnum(localStorage.getItem("detailId"), data)
      .then(res => {
        if (res) {
          history.push('/AdminEnumDetail', { id: enumId });
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  }

  const onDeleteEnumItem = () => {

    deletetoggle();

    apiDeleteEnumById(localStorage.getItem("detailId"))
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    history.push('/AdminEnums')

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);
  const [deletemodal, setDeleteModal] = useState(false);
  const deletetoggle = () => setDeleteModal(!deletemodal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Modify Enum Item</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="ID" value={enumId} disabled/>
        <OneInputText label="値" value={value} changeAction={handleValue} type="number" />
        <TextArea label="名称" value={name} changeAction={handleName} />
        <TextArea label="説明" value={description} changeAction={handleDescription} />
        <OneInputText label="表示重み" value={displayweight} changeAction={handleDisplayWeight} type="number" />
        <OneInputText label="ステータス" value={status} changeAction={handleStatus} type="number" />
      </div>
      <div>
        <NormalButton label="更　新" onClick={updatetoggle} />
        <NormalButton label="削　除" onClick={deletetoggle} />
        <Link to={{ pathname: "/AdminEnumDetail", state: { id: enumId } }}>
          <NormalButton label="戻　る" />
        </Link>
        <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onEnumItemModify} />
        <DeleteModal state={deletemodal} onNo={deletetoggle} onYes={onDeleteEnumItem} />
      </div>
    </Card>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);

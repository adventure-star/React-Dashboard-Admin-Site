import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';

import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import { apiCreateEnum } from 'services/apis/enums';
import SaveModal from 'components/SaveModal';
import TextArea from 'components/TextArea';

function AddForm() {

  let data = useLocation();

  let enumId = data.state !== undefined ? data.state.id : localStorage.getItem("enumId");

  let history = useHistory();

  const [value, setValue] = useState("");
  const handleValue = event => {
    setValue(event.target.value);
  };

  const [status, setStatus] = useState("");
  const handleStatus = event => {
    setStatus(event.target.value);
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

  useEffect(() => {

    enumId = data.state !== undefined ? data.state.id : localStorage.getItem("enumId");

    localStorage.setItem("enumId", enumId);

  }, [value, status, name, description, displayweight]);

  const onEnumItemCreate = () => {

    toggle();

    var data = {
      enum_id: enumId,
      value: value,
      name: name,
      description: description,
      view_weight: displayweight,
      status: status
    }
    console.log(data);

    apiCreateEnum(data)
      .then(res => {
        if (res) {
          history.push('/AdminEnumDetail', {id: enumId})
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
      <div className="font-size-lg font-weight-bold">Add New Enum Item</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="ID" value={enumId} disabled/>
        <OneInputText label="値" value={value} changeAction={handleValue} />
        <TextArea label="名称" value={name} changeAction={handleName} />
        <TextArea label="説明" value={description} changeAction={handleDescription} />
        <OneInputText label="表示重み" value={displayweight} changeAction={handleDisplayWeight} />
        <OneInputText label="ステータス" value={status} changeAction={handleStatus} />
      </div>
      <div>
        <NormalButton label="更　新" onClick={toggle} />
        <NormalButton label="削　除" />
        <Link to={{ pathname: "/AdminEnumDetail", state: { id: enumId } }}>
          <NormalButton label="戻　る" />
        </Link>
        <SaveModal state={modal} onNo={toggle} onYes={onEnumItemCreate} />
      </div>
    </Card>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

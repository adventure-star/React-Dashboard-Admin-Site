import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';
import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import { Link, useHistory } from 'react-router-dom';
import { apiCreateConfig } from 'services/apis/configs';
import SaveModal from 'components/SaveModal';
import LongTextArea from 'components/LongTextArea';

function AddForm() {

  let history = useHistory();

  const [keyvalue, setKeyValue] = useState("");
  const handleKeyValue = event => {
    setKeyValue(event.target.value);
  };

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

  const onCreateConfig = () => {

    toggle();

    var data = {
      key: keyvalue,
      value: value,
      description: description,
      view_weight: displayorder
    }
    console.log(data);

    apiCreateConfig(data)
      .then(res => {
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

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Add New Config</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="キー値" value={keyvalue} changeAction={handleKeyValue} />
        <OneInputText label="説明" value={description} changeAction={handleDescription} />
        <LongTextArea label="値" value={value} changeAction={handleValue} />
        <OneInputText label="表示順" value={displayorder} changeAction={handleDisplayOrder} type="number" />
      </div>
      <div>
        <NormalButton label="更　新" onClick={toggle} />
        <Link to="/AdminConfigs">
          <NormalButton label="戻　る" />
        </Link>
        <SaveModal state={modal} onNo={toggle} onYes={onCreateConfig}/>
      </div>
    </Card>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

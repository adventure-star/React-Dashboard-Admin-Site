import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import {
  Card,
  Divider,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { apiMembers, apiMemberCreate } from 'services/apis/users';
import OneInputText from 'components/OneInputText';
import OneInputTextSmall from 'components/OneInputTextSmall';
import TextArea from 'components/TextArea';
import NormalButton from 'components/NormalButton';
import { Link, useHistory } from 'react-router-dom';
import DropDown from 'components/DropDown';
import SaveModal from 'components/SaveModal';

function AddForm(props) {

  let history = useHistory();

  const [inquirynumber, setInquryNumber] = useState("");
  const handleInquiryNumber = event => {
    setInquryNumber(event.target.value);
  };

  const [message, setMessage] = useState("");
  const handleMessage = event => {
    setMessage(event.target.value);
  };

  const [name, setName] = useState("");
  const handleName = event => {
    setName(event.target.value);
  };

  const [reading, setReading] = useState("");
  const handleReading = event => {
    setReading(event.target.value);
  };

  const [area, setArea] = useState("0");
  const handleArea = event => {
    setArea(event.target.value);
  };

  const [zip01, setZip01] = useState("");
  const handleZip01 = event => {
    setZip01(event.target.value);
  };

  const [zip02, setZip02] = useState("");
  const handleZip02 = event => {
    setZip02(event.target.value);
  };

  const [address, setAddress] = useState("");
  const handleAddress = event => {
    setAddress(event.target.value);
  };

  const [tel, setTel] = useState("");
  const handleTel = event => {
    setTel(event.target.value);
  };

  const [mail, setMail] = useState("");
  const handleMail = event => {
    setMail(event.target.value);
  };

  const [handlename, setHandleName] = useState("");
  const handleHandleName = event => {
    setHandleName(event.target.value);
  };

  const [level, setLevel] = useState("");
  const handleLevel = event => {
    setLevel(event.target.value);
  };

  const [age, setAge] = useState("");
  const handleAge = event => {
    setAge(event.target.value);
  };

  const [point1, setPoint1] = useState("");
  const handlePoint1 = event => {
    setPoint1(event.target.value);
  };

  const [point2, setPoint2] = useState("");
  const handlePoint2 = event => {
    setPoint2(event.target.value);
  };

  const [mobileid, setMobileId] = useState("");
  const handleMobileId = event => {
    setMobileId(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const [remark, setRemark] = useState("");
  const handleRemark = event => {
    setRemark(event.target.value);
  };

  const [point, setPoint] = useState(1);
  const handlePoint = event => {
    setPoint(event.target.value);
  };

  const [terminaltype, setTerminalType] = useState(1);
  const handleTerminalType = event => {
    setTerminalType(event.target.value);
  };

  const [type, setType] = useState(1);
  const handleType = event => {
    setType(event.target.value);
  };

  const [status, setStatus] = useState("0");
  const handleStatus = event => {
    setStatus(event.target.value);
  };

  const [sex, setSex] = useState("1");
  const handleSex = event => {
    setSex(event.target.value);
  };

  function StyledRadio(props) {

    const classes = useStyles();

    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }
  const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });

  const onUserCreate = () => {

    toggle();

    const data = {
      name: name,
      mail_address: mail,
      tel: tel,
      area: Number(area),
      sex: Number(sex),
      str_sex: null,
      birth_date: null,
      blood_type: Number(age),
      login_id: null,
      password: password,
      point: Number(point),
      join_date: null,
      mobile_id: mobileid,
      note: null,
      status: Number(status),
      str_status: null,
      reserved1: Number(terminaltype),
      reserved2: Number(type),
      inquiry_number: inquirynumber,
      message: message,
      yomi: reading,
      zip01: zip01,
      zip02: zip02,
      addr: address,
      handle: handlename,
      level: level,
      biko: remark
    }

    console.log(data);

    apiMemberCreate(data)
      .then(res => {
        if (res) {
          history.push('/AdminMembers')
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
    <>
      <Card className="p-4 mb-4">
        <div className="font-size-lg font-weight-bold">Add New Member</div>
        <Divider className="my-4" />
        <div>
          <OneInputText label="会員ID" value="新規" disabled/>
          <OneInputText label="問い合わせ番号" changeAction={handleInquiryNumber} />
          <TextArea label="メッセージ" changeAction={handleMessage} />
          <OneInputText label="名前" changeAction={handleName} />
          <OneInputText label="読み" changeAction={handleReading} />
          <DropDown id="area" label="地域" param="/enums/all/?enum_id=member.area2" value={area} changeAction={handleArea} />
          <OneInputText label="zip01" changeAction={handleZip01} />
          <OneInputText label="zip02" changeAction={handleZip02} />
          <TextArea label="住所" changeAction={handleAddress} />
          <OneInputText label="電話番号" changeAction={handleTel} />
          <OneInputText label="メールアドレス" changeAction={handleMail} />
          <OneInputText label="ハンドル名" changeAction={handleHandleName} />
          <OneInputText label="レベル" changeAction={handleLevel} />
          <FormControl component="fieldset" className="m-2 w-50">
            <FormLabel component="legend">性別</FormLabel>
            <RadioGroup aria-label="gender" name="customized-radios" defaultValue="1" onChange={handleSex} style={{ display: "inline" }}>
              <FormControlLabel value="1" control={<StyledRadio />} label="男性" />
              <FormControlLabel value="2" control={<StyledRadio />} label="女性" />
            </RadioGroup>
          </FormControl>
          <OneInputText label="年齢" changeAction={handleAge} type="number" />
          <OneInputText label="入会日" value="" disabled/>
          <OneInputText label="ポイント" changeAction={handlePoint} type="number" />
          <OneInputText label="退会日" value="" disabled/>
          <OneInputText label="携帯ID" changeAction={handleMobileId} />
          <DropDown id="terminaltype" label="端末種別" param="/enums/all/?enum_id=member.reserved1" value={terminaltype} changeAction={handleTerminalType} />
          <DropDown id="type" label="種別" param="/enums/all/?enum_id=member.reserved2" value={type} changeAction={handleType} />
          <OneInputText label="パスワード" changeAction={handlePassword} />
          <DropDown id="status" label="ステータス" param="/enums/all/?enum_id=member.status" value={status} changeAction={handleStatus} />
          <TextArea label="備考" value={remark} changeAction={handleRemark} />
        </div>
        <div>
          <NormalButton label="更　新" onClick={toggle} />
          <Link to="/AdminMembers">
            <NormalButton label="戻　る" />
          </Link>
          <NormalButton label="マイスターポイント付与" />
          <SaveModal state={modal} onNo={toggle} onYes={onUserCreate} />
        </div>
      </Card>
    </>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

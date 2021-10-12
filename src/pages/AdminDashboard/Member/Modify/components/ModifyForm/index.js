import React, { useEffect, useState } from 'react';
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

import OneInputText from 'components/OneInputText';
import OneInputTextSmall from 'components/OneInputTextSmall';
import TextArea from 'components/TextArea';
import NormalButton from 'components/NormalButton';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { apiProfileById } from 'services/apis/user_profile';
import DropDown from 'components/DropDown';
import { apiUpdateMember, apiMemberDeleteById, apiMemberAddPointById } from 'services/apis/users';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';

function ModifyForm(props) {

  let history = useHistory();

  let data = useLocation();

  let memberId = data.state !== undefined ? data.state.id : localStorage.getItem("userId");

  const [member, setMember] = useState(null);

  const [id, setId] = useState("");

  const [inquirynumber, setInquryNumber] = useState(null);
  const handleInquiryNumber = event => {
    setInquryNumber(event.target.value);
  };

  const [name, setName] = useState("");
  const handleName = event => {
    setName(event.target.value);
  };

  const [message, setMessage] = useState("");
  const handleMessage = event => {
    setMessage(event.target.value);
  };

  const [reading, setReading] = useState("");
  const handleReading = event => {
    setReading(event.target.value);
  };

  const [area, setArea] = useState(1);
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

  const [joindate, setJoinDate] = useState("");


  const [point1, setPoint1] = useState(0);
  const handlePoint1 = event => {
    setPoint1(event.target.value);
  };

  const [point2, setPoint2] = useState(0);
  const handlePoint2 = event => {
    setPoint2(event.target.value);
  };

  const [pointtype, setPointType] = useState(0);
  const handlePointType = event => {
    setPointType(event.target.value);
  };

  const [mobileid, setMobileId] = useState("");
  const handleMobileId = event => {
    setMobileId(event.target.value);
  };

  const [terminaltype, setTerminalType] = useState(1);
  const handleTerminalType = event => {
    setTerminalType(event.target.value);
  };

  const [type, setType] = useState(1);
  const handleType = event => {
    setType(event.target.value);
  };

  const [status, setStatus] = useState(1);
  const handleStatus = event => {
    setStatus(event.target.value);
  };

  const [remark, setRemark] = useState("");
  const handleRemark = event => {
    setRemark(event.target.value);
  };

  const [mailaddress, setMailAddress] = useState("");
  const handleMailAddress = event => {
    setMailAddress(event.target.value);
  };

  const [sex, setSex] = useState("1");
  const handleSex = event => {
    setSex(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const [leavedate, setLeaveDate] = useState("");

  useEffect(() => {

    localStorage.setItem("userId", memberId);

    getMember();

  }, [memberId]);

  const getMember = async () => {

    let userId = data.state !== undefined ? data.state.id : localStorage.getItem("userId");

    const memberRes = await apiProfileById(userId);

    setId(memberRes.id);
    setInquryNumber(memberRes.inquiry_number);
    setName(memberRes.name);
    setMessage(memberRes.message);
    setReading(memberRes.yomi);
    setArea(memberRes.area);
    setZip01(memberRes.zip01);
    setZip02(memberRes.zip02);
    setAddress(memberRes.addr);
    setHandleName(memberRes.handle);
    setLevel(memberRes.level);
    setAge(memberRes.blood_type);
    setJoinDate(memberRes.join_date);
    setLeaveDate(memberRes.leave_date);
    setMobileId(memberRes.mobile_id);
    setTerminalType(memberRes.reserved1);
    setType(memberRes.reserved2);
    setStatus(memberRes.status);
    setRemark(memberRes.biko);
    setMailAddress(memberRes.mail_address);
    setSex(memberRes.sex);
    setPoint1(memberRes.point);
    setPassword(memberRes.password);
    setTel(memberRes.tel);

    console.log(memberRes);

    setMember(memberRes);

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

  const onUserModify = () => {

    updatetoggle();

    const data = {

      name: name,
      mail_address: mailaddress,
      tel: tel,
      area: Number(area),
      sex: Number(sex),
      str_sex: null,
      birth_date: null,
      blood_type: Number(age),
      login_id: null,
      password: password,
      point: Number(point1),
      join_date: null,
      leave_date: null,
      login_date: null,
      mobile_id: mobileid,
      note: remark,
      status: Number(status),
      str_status: null,
      delete_flg: null,
      reserved1: Number(terminaltype),
      reserved2: Number(type),
      inquiry_number: Number(inquirynumber),
      message: message,
      yomi: reading,
      zip01: zip01,
      zip02: zip02,
      addr: address,
      handle: handlename,
      level: Number(level),
      biko: remark

    }

    let userId = data.state !== undefined ? data.state.id : localStorage.getItem("userId");

    console.log(data);

    apiUpdateMember(userId, data)
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

  const onUserDelete = () => {

    deletetoggle();

    apiMemberDeleteById(localStorage.getItem("userId"))
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    history.push('/AdminMembers')

  }

  const addPoint = () => {

    let data = {
      member_id: id,
      payment_type: pointtype,
      point: point2
    }

    apiMemberAddPointById(id, data)
      .then(res => {
        history.push("/AdminMembers");
      })
      .catch(function (error) {
        console.log('===== error:', error);
      });

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);
  const [deletemodal, setDeleteModal] = useState(false);
  const deletetoggle = () => setDeleteModal(!deletemodal);

  return (
    <>
      <Card className="p-4 mb-4">
        <div className="font-size-lg font-weight-bold">Modify Member</div>
        <Divider className="my-4" />
        {id !== "" &&
          <div>
            <OneInputText label="会員ID" value={id} />
            <OneInputText label="問い合わせ番号" value={inquirynumber} changeAction={handleInquiryNumber} />
            <TextArea label="メッセージ" value={message} changeAction={handleMessage} />
            <OneInputText label="名前" value={name} changeAction={handleName} />
            <OneInputText label="読み" value={reading} changeAction={handleReading} />
            <DropDown id="area" label="地域" param="/enums/all/?enum_id=member.area2" defaultValue={area} changeAction={handleArea} />
            <OneInputText label="zip01" value={zip01} changeAction={handleZip01} />
            <OneInputText label="zip02" value={zip02} changeAction={handleZip02} />
            <TextArea label="住所" value={address} changeAction={handleAddress} />
            <OneInputText label="電話番号" value={tel} changeAction={handleTel} />
            <OneInputText label="メールアドレス" value={mailaddress} changeAction={handleMailAddress} />
            <OneInputText label="ハンドル名" value={handlename} changeAction={handleHandleName} />
            <OneInputText label="レベル" value={level} changeAction={handleLevel} />
            <FormControl component="fieldset" className="m-2 w-50">
              <FormLabel component="legend">性別</FormLabel>
              <RadioGroup aria-label="gender" name="customized-radios" value={sex.toString()} onChange={handleSex} style={{ display: "inline" }}>
                <FormControlLabel value="1" control={<StyledRadio />} label="男性" />
                <FormControlLabel value="2" control={<StyledRadio />} label="女性" />
              </RadioGroup>
            </FormControl>
            <OneInputText label="年齢" value={age} changeAction={handleAge} type="number" />
            <OneInputText label="入会日" value={joindate} disabled/>
            <div className="p-4 m-2 w-50" style={{ borderRadius: "5px", border: "1px solid gray", display: "flex", alignItems: "center" }}>
              <OneInputTextSmall label="ポイント" value={point1} type="number" />
              <OneInputTextSmall label="ポイント" defaultValue={point2} changeAction={handlePoint2} />
              <DropDown id="point" label="" param="/enums/all/?enum_id=payment.type" defaultValue={pointtype} changeAction={handlePointType} />
              <NormalButton label="追加" onClick={addPoint} />
            </div>
            <OneInputText label="退会日" value={leavedate} disabled/>
            <OneInputText label="携帯ID" value={mobileid} changeAction={handleMobileId} />
            <DropDown id="terminaltype" label="端末種別" param="/enums/all/?enum_id=member.reserved1" defaultValue={terminaltype} changeAction={handleTerminalType} />
            <DropDown id="type" label="種別" param="/enums/all/?enum_id=member.reserved2" defaultValue={type} changeAction={handleType} />
            <OneInputText label="パスワード" value={password} changeAction={handlePassword} />
            <DropDown id="status" label="ステータス" param="/enums/all/?enum_id=member.status" defaultValue={status} changeAction={handleStatus} />
            <TextArea label="備考" value={remark} changeAction={handleRemark} />
          </div>
        }
        <div>
          <NormalButton label="更　新" onClick={updatetoggle} />
          <NormalButton label="削　除" onClick={deletetoggle} />
          <Link to="/AdminMembers">
            <NormalButton label="戻　る" />
          </Link>
          <NormalButton label="マイスターポイント付与" />
          <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onUserModify} />
          <DeleteModal state={deletemodal} onNo={deletetoggle} onYes={onUserDelete} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);

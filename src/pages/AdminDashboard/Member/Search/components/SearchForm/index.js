import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';

import OneInputText from 'components/OneInputText';
import OneInputTextSmall from 'components/OneInputTextSmall';
import OneDatePicker from 'components/OneDatePicker';
import DropDown from 'components/DropDown';
import NormalButton from 'components/NormalButton';
import { Link, useHistory } from 'react-router-dom';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';

function SearchForm(props) {

  const [id, setId] = useState("");
  const handleId = event => {
    setId(event.target.value);
  };

  const [name, setName] = useState("");
  const handleName = event => {
    setName(event.target.value);
  };

  const [nickname, setNickName] = useState("");
  const handleNickName = event => {
    setNickName(event.target.value);
  };

  const [mail, setMail] = useState("");
  const handleMail = event => {
    setMail(event.target.value);
  };

  const [postcode, setPostCode] = useState("");
  const handlePostCode = event => {
    setPostCode(event.target.value);
  };

  const [address, setAddress] = useState("");
  const handleAddress = event => {
    setAddress(event.target.value);
  };

  const [reading, setReading] = useState("");
  const handleReading = event => {
    setReading(event.target.value);
  };

  const [birthStart, setBirthStart] = useState(new Date("1900-01-01"));
  const handleBirthStart = date => {
    setBirthStart(date);
  };

  const [birthEnd, setBirthEnd] = useState(new Date);
  const handleBirthEnd = date => {
    setBirthEnd(date);
  };

  const [membership, setMemberShip] = useState("");
  const handleMemberShip = event => {
    setMemberShip(event.target.value);
  };

  const [joinStart, setJoinStart] = useState(new Date("1900-01-01"));
  const handleJoinStart = date => {
    setJoinStart(date);
  };

  const [joinEnd, setJoinEnd] = useState(new Date);
  const handleJoinEnd = date => {
    setJoinEnd(date);
  };

  const [leaveStart, setLeaveStart] = useState(new Date("1900-01-01"));
  const handleLeaveStart = date => {
    setLeaveStart(date);
  };

  const [leaveEnd, setLeaveEnd] = useState(new Date);
  const handleLeaveEnd = date => {
    setLeaveEnd(date);
  };

  const [updateStart, setUpdateStart] = useState(new Date("1900-01-01"));
  const handleUpdateStart = date => {
    setUpdateStart(date);
  };

  const [updateEnd, setUpdateEnd] = useState(new Date);
  const handleUpdateEnd = date => {
    setUpdateEnd(date);
  };

  const [expiredate, setExpireDate] = useState(new Date("2050-12-31"));
  const handleExpireDate = date => {
    setExpireDate(date);
  };

  const [status, setStatus] = useState("");
  const handleStatus = event => {
    setStatus(event.target.value);
  }

  const [continuestart, setContinueStart] = useState("");
  const handleContinueStart = event => {
    setContinueStart(event.target.value);
  };

  const [continueend, setContinueEnd] = useState("");
  const handleContinueEnd = event => {
    setContinueEnd(event.target.value);
  };

  const history = useHistory();

  const onSearchUser = () => {

    const data = {
      id: id,
      name: name,
      nick_name: nickname,
      mail_address: mail,
      zip02: postcode,
      addr: address,
      yomi: reading,
      birth_date__from: Moment(birthStart).format("YYYY-MM-DDTHH:mm:ss"),
      birth_date__to: Moment(birthEnd).format("YYYY-MM-DDTHH:mm:ss"),
      monthly_membership: membership,
      join_date__from: Moment(joinStart).format("YYYY-MM-DDTHH:mm:ss"),
      join_date__to: Moment(joinEnd).format("YYYY-MM-DDTHH:mm:ss"),
      leave_date__from: Moment(leaveStart).format("YYYY-MM-DDTHH:mm:ss"),
      leave_date__to: Moment(leaveEnd).format("YYYY-MM-THH:mm:ss"),
      login_date__from: Moment(updateStart).format("YYYY-MM-DDTHH:mm:ss"),
      login_date__to: Moment(updateEnd).format("YYYY-MM-DDTHH:mm:ss"),
      expire_date__from: Moment(expiredate).format("YYYY-MM-DDTHH:mm:ss"),
      expire_dat__to: Moment(expiredate).format("YYYY-MM-DDTHH:mm:ss"),
      status: status,
      year_of_continuation_from: continuestart,
      year_of_continuation_to: continueend
    }

    clean(data);

    console.log(data);

    history.push("/AdminMembers", data);

  }

  function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
  }

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Search Member</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="会員ID" value={id} changeAction={handleId} />
        <OneInputText label="名前" value={name} changeAction={handleName} />
        <OneInputText label="ハンドルネーム" value={nickname} changeAction={handleNickName} />
        <OneInputText label="メールアドレス" value={mail} changeAction={handleMail} />
        <OneInputText label="郵便番号" value={postcode} changeAction={handlePostCode} />
        <OneInputText label="住所" value={address} changeAction={handleAddress} />
        <OneInputText label="読み" value={reading} changeAction={handleReading} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }} className="pr-4">生年月日</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={birthStart}
              onChange={handleBirthStart}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              style={{ marginRight: "10px" }}
            />
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={birthEnd}
              onChange={handleBirthEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <OneDatePicker title="月会員" value={membership} changeAction={handleMemberShip} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }} className="pr-4">入会日</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={joinStart}
              onChange={handleJoinStart}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              style={{ marginRight: "10px" }}
            />
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={joinEnd}
              onChange={handleJoinEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }} className="pr-4">退会日</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={leaveStart}
              onChange={handleLeaveStart}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              style={{ marginRight: "10px" }}
            />
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={leaveEnd}
              onChange={handleLeaveEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }} className="pr-4">会員更新日</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={updateStart}
              onChange={handleUpdateStart}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              style={{ marginRight: "10px" }}
            />
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={updateEnd}
              onChange={handleUpdateEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <OneDatePicker title="失効日" value={expiredate} changeAction={handleExpireDate} />
        <DropDown label="ステータス" param="/enums/all/?enum_id=member.status" changeAction={handleStatus} value={status} changeAction={handleStatus} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }} className="pr-4">継続年数</span>
          <OneInputTextSmall value={continuestart} changeAction={handleContinueStart} style={{ marginRight: "10px" }}/>
          <span>
            年目 ~
          </span>
          <OneInputTextSmall value={continueend} changeAction={handleContinueEnd} style={{ marginRight: "10px" }}/>
          <span>
            年目
          </span>
        </div>
      </div>
      <div>
        <NormalButton label="検　索" onClick={onSearchUser} />
        <NormalButton label="条件クリア" />
        <Link to="/AdminMembers">
          <NormalButton label="戻　る" />
        </Link>
      </div>
    </Card>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

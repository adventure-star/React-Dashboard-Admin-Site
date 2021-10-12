import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Fab,
  Card,
  Divider
} from '@material-ui/core';

import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import NavigationIcon from '@material-ui/icons/Navigation';
import DateFnsUtils from '@date-io/date-fns';
import OneInputText from 'components/OneInputText';
import { Link, useLocation, useHistory } from 'react-router-dom';
import DropDown from 'components/DropDown';
import NormalButton from 'components/NormalButton';
import { apiEventById, apiUpdateEvent, apiDeleteEventById } from 'services/apis/events';
import Moment from 'moment';
import StatusDropDown from 'components/StatusDropDown';
import AreaDropDown from 'components/AreaDropDown';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';
import TextArea from 'components/TextArea';
import LongTextArea from 'components/LongTextArea';

var momentZone = require('moment-timezone');


function ModifyForm() {

  let data = useLocation();

  let eventId = data.state !== undefined ? data.state.id : localStorage.getItem("eventId");

  let history = useHistory();

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date()
  );
  const [selectedStartTime, setSelectedStartTime] = useState(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date('2020-12-31')
  );
  const [selectedEndTime, setSelectedEndTime] = useState(
    new Date('2020-12-31T23:59:59')
  );

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };
  const handleStartTimeChange = time => {
    setSelectedStartTime(time);
  };
  const handleEndDateChange = date => {
    setSelectedEndDate(date);
  };
  const handleEndTimeChange = time => {
    setSelectedEndTime(time);
  };

  const [title, setTitle] = useState("");
  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const [area, setArea] = useState("");
  const handleArea = event => {
    setArea(event.target.value);
  };

  const [eventtype, setEventType] = useState("");
  const handleEventType = event => {
    setEventType(event.target.value);
  };

  const [heading, setHeading] = useState("");
  const handleHeading = event => {
    setHeading(event.target.value);
  };

  const [pagecontent, setPageContent] = useState("");
  const handlePageContent = event => {
    setPageContent(event.target.value);
  };

  const [displayorder, setDisplayOrder] = useState("");
  const handleDisplayOrder = event => {
    setDisplayOrder(event.target.value);
  };

  const [status, setStatus] = useState("");
  const handleStatus = event => {
    setStatus(event.target.value);
  };

  useEffect(() => {

    localStorage.setItem("eventId", eventId);

    getEvent();

  }, []);

  const getEvent = async () => {

    let eventId = data.state !== undefined ? data.state.id : localStorage.getItem("eventId");

    const res = await apiEventById(eventId);

    setTitle(res.title);
    setArea(res.extended1);
    setEventType(res.extended2);
    setHeading(res.description);
    setPageContent(res.content);
    setSelectedStartDate(momentZone(res.start_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));
    setSelectedStartTime(momentZone(res.start_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));
    setSelectedEndDate(momentZone(res.expire_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));
    setSelectedEndTime(momentZone(res.expire_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));
    setDisplayOrder(res.view_weight);
    setStatus(res.delete_flag);

    console.log(res);

  };

  const onEventModify = () => {

    updatetoggle();

    var data = {
      title: title,
      extended1: area,
      extended2: eventtype,
      description: heading,
      content: pagecontent,
      view_weight: displayorder,
      delete_flag: status,
      start_date: Moment(selectedStartDate).format("YYYY-MM-DD") + "T" + Moment(selectedStartTime).format("HH:mm:ss") + "Z",
      expire_date: Moment(selectedEndDate).format("YYYY-MM-DD") + "T" + Moment(selectedEndTime).format("HH:mm:ss") + "Z",
      delete_flag: status
    }
    console.log(data);

    apiUpdateEvent(localStorage.getItem("eventId"), data).then(res => {
        if (res) {
          history.push('/AdminEvents')
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  }

  const onDeleteEvent = () => {

    deletetoggle();

    apiDeleteEventById(localStorage.getItem("eventId"))
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    history.push('/AdminEvents')

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);
  const [deletemodal, setDeleteModal] = useState(false);
  const deletetoggle = () => setDeleteModal(!deletemodal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Modify Event</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="タイトル" value={title} changeAction={handleTitle} />
        <AreaDropDown id="area" label="地域" param="/region/all" defaultValue={area} changeAction={handleArea} />
        <DropDown id="type" label="イベント種別" param="/event_type/all/" defaultValue={eventtype} changeAction={handleEventType} />
        <TextArea label="見出し" value={heading} changeAction={handleHeading} />
        <div className="my-2 w-50 text-center">
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            className="mx-2">
            <NavigationIcon />
            画像管理
          </Fab>
        </div>
        <LongTextArea label="ページ内容" value={pagecontent} changeAction={handlePageContent} />
        <div className="my-2 w-50 text-center">
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            className="mx-2">
            <NavigationIcon />
            画像管理
          </Fab>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }} className="pr-4">配信開始日</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              format="MM/dd/yyyy"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              value={selectedStartTime}
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }} className="pr-4">配信終了日</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              format="MM/dd/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              value={selectedEndTime}
              onChange={handleEndTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <OneInputText label="表示順" value={displayorder} changeAction={handleDisplayOrder} type="number" />
        <StatusDropDown id="status" label="ステータス" defaultValue={status} changeAction={handleStatus} />
      </div>
      <div>
        <NormalButton label="更　新" onClick={updatetoggle} />
        <NormalButton label="削　除" onClick={deletetoggle} />
        <Link to="/AdminEvents">
          <NormalButton label="戻　る" />
        </Link>
        <Link to={{ pathname: "/AdminEventChildAdd", state: { id: eventId } }}>
          <NormalButton label="子ﾍﾟｰｼﾞの追加" />
        </Link>
        <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onEventModify} />
        <DeleteModal state={deletemodal} onNo={deletetoggle} onYes={onDeleteEvent} />
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

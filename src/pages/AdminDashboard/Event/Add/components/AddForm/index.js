import React, { useState } from 'react';
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
import DropDown from 'components/DropDown';
import StatusDropDown from 'components/StatusDropDown';
import NormalButton from 'components/NormalButton';
import { Link, useHistory } from 'react-router-dom';
import { apiCreateEvent } from 'services/apis/events';
import Moment from 'moment';
import AreaDropDown from 'components/AreaDropDown';
import SaveModal from 'components/SaveModal';
import TextArea from 'components/TextArea';
import LongTextArea from 'components/LongTextArea';


function AddForm() {

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
    new Date('2020-12-31T23:59:59Z')
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

  const onEventCreate = () => {

    toggle();

    var data = {
      key: "event",
      title: title,
      extended1: area,
      extended2: eventtype,
      description: heading,
      content: pagecontent,
      view_weight: displayorder,
      start_date: Moment(selectedStartDate).format("YYYY-MM-DD") + "T" + Moment(selectedStartTime).format("HH:mm:ss") + "Z",
      expire_date: Moment(selectedEndDate).format("YYYY-MM-DD") + "T" + Moment(selectedEndTime).format("HH:mm:ss") + "Z",
      delete_flag: status
    }
    console.log(data);

    apiCreateEvent(data)
      .then(res => {
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

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Add New Event</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="タイトル" value={title} changeAction={handleTitle} />
        <AreaDropDown id="area" label="地域" param="/region/all" value={area} changeAction={handleArea} />
        <DropDown id="type" label="イベント種別" param="/event_type/all/" value={eventtype} changeAction={handleEventType} />
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
        <NormalButton label="更　新" onClick={toggle} />
        <Link to="/AdminEvents">
          <NormalButton label="戻　る" />
        </Link>
        <SaveModal state={modal} onNo={toggle} onYes={onEventCreate} />
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

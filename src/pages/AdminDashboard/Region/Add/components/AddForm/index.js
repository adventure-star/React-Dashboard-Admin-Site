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
import NormalButton from 'components/NormalButton';
import { apiRegionCreate } from 'services/apis/regions';
import { useHistory } from 'react-router';
import Moment from 'moment';
import StatusDropDown from 'components/StatusDropDown';
import { Link } from 'react-router-dom';
import SaveModal from 'components/SaveModal';
import LongTextArea from 'components/LongTextArea';


function AddForm(props) {

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

  const [title2, setTitle2] = useState("");
  const handleTitle2 = event => {
    setTitle2(event.target.value);
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

  const onCreateRegion = () => {

    toggle();

    var data = {
      key: "region",
      title: title,
      description: title2,
      content: pagecontent,
      view_weight: displayorder,
      start_date: Moment(selectedStartDate).format("YYYY-MM-DD") + "T" + Moment(selectedStartTime).format("HH:mm:ss") + "Z",
      expire_date: Moment(selectedEndDate).format("YYYY-MM-DD") + "T" + Moment(selectedEndTime).format("HH:mm:ss") + "Z",
    }

    console.log(data);

    apiRegionCreate(data)
      .then(res => {
        if (res) {
          history.push('/AdminRegions')
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
      <div className="font-size-lg font-weight-bold">Add New Region</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="地域ID" value="" disabled />
        <OneInputText label="タイトル" value={title} changeAction={handleTitle} />
        <OneInputText label="タイトル2" value={title2} changeAction={handleTitle2} />
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
        <Link to="/AdminRegions">
          <NormalButton label="戻　る" />
        </Link>
        <SaveModal state={modal} onNo={toggle} onYes={onCreateRegion}/>
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

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Fab,
  Card,
  Divider
} from '@material-ui/core';

import { apiNewsById, apiUpdateNews, apiDeleteNewsById } from 'services/apis/news';
import NavigationIcon from '@material-ui/icons/Navigation';
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import TextArea from 'components/TextArea';
import DropDown from 'components/DropDown';
import { Link, useLocation, useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'moment';
import StatusDropDown from 'components/StatusDropDown';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';
import LongTextArea from 'components/LongTextArea';

var momentZone = require('moment-timezone');

function ModifyForm() {

  let data = useLocation();

  let newsId = data.state !== undefined ? data.state.id : localStorage.getItem("newsId");

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

  const [objectid, setObjectId] = useState("");

  const [key, setKey] = useState("");

  const [title, setTitle] = useState("");
  const handleTitle = event => {
    setTitle(event.target.value);
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

  const [state, setState] = useState("");
  const handleState = event => {
    setState(event.target.value);
  };

  useEffect(() => {

    localStorage.setItem("newsId", newsId);

    getNews();

  }, []);

  const getNews = async () => {

    newsId = data.state !== undefined ? data.state.id : localStorage.getItem("newsId");

    const res = await apiNewsById(newsId);

    setObjectId(res.object_id);
    setKey(res.key);
    setTitle(res.title);
    setHeading(res.description);
    setPageContent(res.content);
    setDisplayOrder(res.view_weight);
    setState(res.delete_flag);

    setSelectedStartDate(momentZone(res.start_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));
    setSelectedStartTime(momentZone(res.start_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));
    setSelectedEndDate(momentZone(res.expire_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));
    setSelectedEndTime(momentZone(res.expire_date).tz("Europe/London").format("YYYY-MM-DDTHH:mm:ss"));

    console.log(res);

  };

  const onModifyNews = () => {

    updatetoggle();

    var data = {
      key: "news",
      title: title,
      description: heading,
      content: pagecontent,
      view_weight: displayorder,
      start_date: Moment(selectedStartDate).format("YYYY-MM-DD") + "T" + Moment(selectedStartTime).format("HH:mm:ss") + "Z",
      expire_date: Moment(selectedEndDate).format("YYYY-MM-DD") + "T" + Moment(selectedEndTime).format("HH:mm:ss") + "Z",
      delete_flag: state
    }

    console.log(data);

    apiUpdateNews(newsId, data)
      .then(res => {
        if (res) {
          history.push('/AdminNews')
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

  const onDeleteNews = () => {

    deletetoggle();

    apiDeleteNewsById(localStorage.getItem("newsId"))
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    history.push('/AdminNews')

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);
  const [deletemodal, setDeleteModal] = useState(false);
  const deletetoggle = () => setDeleteModal(!deletemodal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Modify News</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="タイトル" value={title} changeAction={handleTitle} />
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
        <StatusDropDown id="status" label="ステータス" defaultValue={state} changeAction={handleState} />
      </div>
      <div>
        <NormalButton label="更　新" onClick={updatetoggle} />
        <NormalButton label="削　除" onClick={deletetoggle} />
        <Link to="/AdminNews">
          <NormalButton label="戻　る" />
        </Link>
      </div>
      <div>
        <Link to={{ pathname: "/AdminNewsChildPageAdd", state: { id: newsId } }}>
          <NormalButton label="子ﾍﾟｰｼﾞの追加" />
        </Link>
      </div>
      <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onModifyNews}/>
      <DeleteModal state={deletemodal} onNo={deletetoggle} onYes={onDeleteNews}/>
    </Card>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);

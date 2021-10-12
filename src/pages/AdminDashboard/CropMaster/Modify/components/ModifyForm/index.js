import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  Card,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import DropDown from 'components/DropDown';
import OneInputTextSmall from 'components/OneInputTextSmall';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { apiCropMasterById, apiDeleteCropMasterByid, apiUpdateCropMaster } from 'services/apis/cropmasters';
import FreebieRadioGroup from 'components/FreebieRadioGroup';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';
import LongTextArea from 'components/LongTextArea';
import TextArea from 'components/TextArea';


function ModifyForm() {

  let data = useLocation();

  let cropmasterId = data.state !== undefined ? data.state.id : localStorage.getItem("cropMasterId");

  let history = useHistory();

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date()
  );

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const [cropid, setCropId] = useState("");

  const [area, setArea] = useState("");
  const handleArea = event => {
    setArea(event.target.value);
  };

  const [cropname, setCropName] = useState("");
  const handleCropName = event => {
    setCropName(event.target.value);
  };

  const [level, setLevel] = useState("");
  const handleLevel = event => {
    setLevel(event.target.value);
  };

  const [billing, setBilling] = useState("");
  const handleBilling = event => {
    setBilling(event.target.value);
  };

  const [farm, setFarm] = useState("");
  const handleFarm = event => {
    setFarm(event.target.value);
  };

  const [item, setItem] = useState("");
  const handleItem = event => {
    setItem(event.target.value);
  };

  const [requiredpoints, setRequiredPoints] = useState("");
  const handleRequiredPoints = event => {
    setRequiredPoints(event.target.value);
  };

  const [earnpoints, setEarnPoints] = useState("");
  const handleEarnPoints = event => {
    setEarnPoints(event.target.value);
  };

  const [upperlimitpoint, setUpperLimitPoint] = useState("");
  const handleUpperLimitPoint = event => {
    setUpperLimitPoint(event.target.value);
  };

  const [additionpoint, setAdditionPoint] = useState("");
  const handleAdditionPoint = event => {
    setAdditionPoint(event.target.value);
  };

  const [ngtime, setNGTime] = useState("");
  const handleNGTime = event => {
    setNGTime(event.target.value);
  };

  const [oktime, setOKTime] = useState("");
  const handleOKTime = event => {
    setOKTime(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const [cropalias, setCropAlias] = useState("");
  const handleCropAlias = event => {
    setCropAlias(event.target.value);
  };

  const [daytime, setDayTime] = useState("");
  const handleDayTime = event => {
    setDayTime(event.target.value);
  };

  const [evening, setEvening] = useState("");
  const handleEvening = event => {
    setEvening(event.target.value);
  };

  const [migration, setMigration] = useState("");
  const handleMigration = event => {
    setMigration(event.target.value);
  };

  const [cultivationperiod, setCultivationPeriod] = useState("");
  const handleCultivationPeriod = event => {
    setCultivationPeriod(event.target.value);
  };

  const [plantinglimit, setPlantingLimit] = useState("");
  const handlePlantingLimit = event => {
    setPlantingLimit(event.target.value);
  };

  const [status, setStatus] = useState("");
  const handleStatus = event => {
    setStatus(event.target.value);
  };

  const [initiallevel, setInitialLevel] = useState("");
  const handleInitialLevel = event => {
    setInitialLevel(event.target.value);
  };

  const [maxlevel, setMaxLevel] = useState("");
  const handleMaxLevel = event => {
    setMaxLevel(event.target.value);
  };

  const [harvestlevel, setHarvestLevel] = useState("");
  const handleHarvestLevel = event => {
    setHarvestLevel(event.target.value);
  };

  const [shortestharvestlevel, setShortestHarvestLevel] = useState("");
  const handleShortestHarvestLevel = event => {
    setShortestHarvestLevel(event.target.value);
  };

  const [longestharvestlevel, setLongestHarvestLevel] = useState("");
  const handleLongestHarvestLevel = event => {
    setLongestHarvestLevel(event.target.value);
  };

  const [leveldays, setLevelDays] = useState("");
  const handleLevelDays = event => {
    setLevelDays(event.target.value);
  };

  const [freebie, setFreebie] = useState("");
  const handleFreebie = event => {
    setFreebie(event.target.value);
  };

  const [night, setNight] = useState("");
  const handleNight = event => {
    setNight(event.target.value);
  };

  useEffect(() => {

    localStorage.setItem("cropmasterId", cropmasterId);

    getCropMaster();

  }, [])

  const getCropMaster = async () => {

    const res = await apiCropMasterById(cropmasterId);

    setCropId(res.id);
    setArea(res.region);
    setCropName(res.name);
    setLevel(res.level);
    setBilling(res.charge_type);
    setFarm(res.type);
    setItem(res.item_type);
    setRequiredPoints(res.cost);
    setEarnPoints(res.price);
    setUpperLimitPoint(res.pt_ceiling);
    setAdditionPoint(res.pt_bonus);
    setNGTime(res.rate_ng);
    setOKTime(res.rate_ok);
    setDescription(res.description);
    setCropAlias(res.alias);
    setDayTime(res.day_length);
    setEvening(res.evening_length);
    setNight(res.night_length);
    setMigration(res.duration_length);
    setSelectedStartDate(res.start_date);
    setFreebie(res.prize);
    setCultivationPeriod(res.num_days);
    setPlantingLimit(res.icon);
    setStatus(res.status);
    setInitialLevel(res.view_weight);
    setMaxLevel(res.max_level);
    setHarvestLevel(res.harvest_level);
    setShortestHarvestLevel(res.harvest_level_min);
    setLongestHarvestLevel(res.harvest_level_max);
    setLevelDays(res.level_days);

    console.log(res);

  }

  const onCropMasterUpdate = () => {

    updatetoggle();

    var data = {
      region: area,
      name: cropname,
      level: level,
      charge_type: billing,
      type: farm,
      item_type: item,
      cost: requiredpoints,
      price: earnpoints,
      pt_ceiling: upperlimitpoint,
      pt_bonus: additionpoint,
      rate_ng: ngtime,
      rate_ok: oktime,
      description: description,
      alias: cropalias,
      day_length: daytime,
      evening_length: evening,
      night_length: night,
      duration_length: migration,
      start_date: selectedStartDate,
      prize: freebie,
      num_days: cultivationperiod,
      icon: plantinglimit,
      status: status,
      view_weight: initiallevel,
      max_level: maxlevel,
      harvest_level: harvestlevel,
      harvest_level_min: shortestharvestlevel,
      harvest_level_max: longestharvestlevel,
      level_days: leveldays
    }

    console.log(data);

    apiUpdateCropMaster(localStorage.getItem("cropMasterId"), data)
      .then(res => {
        console.log(res);
        history.push("/AdminCropMaster")
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

  const onDeleteCropMaster = () => {

    deletetoggle();

    apiDeleteCropMasterByid(localStorage.getItem("cropMasterId"))
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    history.push('/AdminCropMaster')

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);
  const [deletemodal, setDeleteModal] = useState(false);
  const deletetoggle = () => setDeleteModal(!deletemodal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Modify CropMaster</div>
      <Divider className="my-4" />
      {cropid &&
        <div>
          <OneInputText label="作物ID" value={cropid} disabled/>
          <DropDown id="area" label="地域" param="/enums/list_by_enum_id/?enum_id=regions" defaultValue={area} changeAction={handleArea} />
          <OneInputText label="作物名" value={cropname} changeAction={handleCropName} />
          <DropDown id="level" label="レベル" param="/enums/list_by_enum_id/?enum_id=crop.level" defaultValue={level} changeAction={handleLevel} type="number" />

          <div className="m-2">
            <span className="pr-4">種別</span>
            <DropDown id="billing" label="課金" param="/enums/list_by_enum_id/?enum_id=crop.chargeType" defaultValue={billing} changeAction={handleBilling} />
            <DropDown id="farm" label="農場" param="/enums/list_by_enum_id/?enum_id=farm.type" defaultValue={farm} changeAction={handleFarm} />
            <DropDown id="item" label="アイテム" param="/enums/list_by_enum_id/?enum_id=crop.itemType" defaultValue={item} changeAction={handleItem} />
          </div>
          <OneInputText label="必須ポイント" value={requiredpoints} changeAction={handleRequiredPoints} type="number" />

          <div style={{ display: "flex", alignItems: "center" }}>
            <OneInputTextSmall label="獲得ﾎﾟｲﾝﾄ" value={earnpoints} changeAction={handleEarnPoints} type="number" />
            <span className="pl-4">※マイスターポイント？</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <OneInputTextSmall label="上限ﾎﾟｲﾝﾄ" value={upperlimitpoint} changeAction={handleUpperLimitPoint} />
            <span className="pl-4">※上限ポイント以上は返却</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <OneInputTextSmall label="加算ﾎﾟｲﾝﾄ" value={additionpoint} changeAction={handleAdditionPoint} />
            <span className="pl-4">※成功時に返却ポイントに加算</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }} className="m-2">
            <span className="pr-4">返金レート</span>
            <OneInputTextSmall label="NG時" value={ngtime} changeAction={handleNGTime} />
            <OneInputTextSmall label="OK時" value={oktime} changeAction={handleOKTime} />
            <span className="pl-4">※消費ポイントの掛け率</span>
          </div>
          <LongTextArea label="説明" value={description} changeAction={handleDescription} />
          <OneInputText label="作物エイリアス" value={cropalias} changeAction={handleCropAlias} />

          <div className="m-2">
            <span className="pr-4">長さ(ms)</span>
            <OneInputText label="日中" value={daytime} changeAction={handleDayTime} type="number" />
            <OneInputText label="夕方" value={evening} changeAction={handleEvening} type="number" />
            <OneInputText label="夜" value={night} changeAction={handleNight} type="number" />
            <OneInputText label="移行" value={migration} changeAction={handleMigration} type="number" />
          </div>
          <div style={{ display: "flex", alignItems: "center" }} className="m-2">
            <span className="pr-4">栽培開始日</span>
            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label=""
                format="MM/dd/yyyy"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <OneInputTextSmall label="栽培期間" value={cultivationperiod} changeAction={handleCultivationPeriod} type="number" />
            <span className="pl-2">日間</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <OneInputTextSmall label="植付リミット" value={plantinglimit} changeAction={handlePlantingLimit} type="number" />
            <span className="pl-2">日</span>
          </div>
          <DropDown id="area" label="ステータス" param="/enums/list_by_enum_id/?enum_id=crop.status" defaultValue={status} changeAction={handleStatus} />
          <FreebieRadioGroup param="/enums/list_by_enum_id/?enum_id=crop.prize" defaultValue={freebie.toString()} changeAction={handleFreebie} type="number" />
          <OneInputText label="初期レベル" value={initiallevel} changeAction={handleInitialLevel} type="number" />
          <OneInputText label="MAXレベル" value={maxlevel} changeAction={handleMaxLevel} />
          <OneInputText label="収穫最適レベル" value={harvestlevel} changeAction={handleHarvestLevel} />
          <OneInputText label="収穫最短レベル" value={shortestharvestlevel} changeAction={handleShortestHarvestLevel} />
          <OneInputText label="収穫最長レベル" value={longestharvestlevel} changeAction={handleLongestHarvestLevel} />
          <TextArea label="レベル日数" value={leveldays} changeAction={handleLevelDays} />
        </div>
      }
      <div>
        <NormalButton label="更　新" onClick={updatetoggle} />
        <NormalButton label="削　除" onClick={deletetoggle} />
        <Link to="/AdminCropMaster">
          <NormalButton label="戻　る" />
        </Link>
        <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onCropMasterUpdate} />
        <DeleteModal state={deletemodal} onNo={deletetoggle} onYes={onDeleteCropMaster} />
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

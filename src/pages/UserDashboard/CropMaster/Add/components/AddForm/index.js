import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles
} from '@material-ui/core';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import DropDown from 'components/DropDown';
import OneInputTextSmall from 'components/OneInputTextSmall';
import { Link, useHistory } from 'react-router-dom';
import { apiCropMasterCreate } from 'services/apis/cropmasters';
import FreebieRadioGroup from 'components/FreebieRadioGroup';
import clsx from 'clsx';


function AddForm() {

  let history = useHistory();

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date()
  );

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const [cropid, setCropId] = useState("");
  const handleCropId = event => {
    setCropId(event.target.value);
  };

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

  const [night, setNight] = useState("");
  const handleNight = event => {
    setNight(event.target.value);
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

  const onCropMasterCreate = () => {

    var data = {
      // region: area,
      region: 2,
      name: cropname,
      // level: level,
      level: 2,
      // charge_type: billing,
      charge_type: 2,
      str_charge_type: null,
      // type: farm,
      type: 2,
      // item_type: item,
      item_type: 2,
      cost: requiredpoints,
      price: earnpoints,
      pt_ceiling: upperlimitpoint,
      pt_bonus: additionpoint,
      rate_ng: ngtime,
      rate_ok: oktime,
      explanation: description,
      alias: cropalias,
      day_length: daytime,
      evening_length: evening,
      night_length: night,
      duration_length: Number(migration),
      start_date: selectedStartDate,
      prize: freebie,
      str_prize: null,
      num_days: cultivationperiod,
      icon: plantinglimit,
      // status: status,
      status: 2,
      prize: freebie,
      str_prize: null,
      view_weight: initiallevel,
      max_level: maxlevel,
      harvest_level: harvestlevel,
      harvest_level_min: shortestharvestlevel,
      harvest_level_max: longestharvestlevel,
      level_days: leveldays
    }

    console.log(data);

    apiCropMasterCreate(data)
      .then(res => {
        if (res) {
          history.push('/AdminCropMaster')
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

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

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Add New CropMaster</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="作物ID" value={cropid} changeAction={handleCropId} />
        <DropDown id="region" label="地域" param="/enums/list_by_enum_id/?emum_id=regions" value={area} changeAction={handleArea} />
        <OneInputText label="作物名" value={cropname} changeAction={handleCropName} />
        <DropDown id="level" label="レベル" param="/enums/list_by_enum_id/?emum_id=crop.level" value={level} changeAction={handleLevel} type="number" />

        <div className="m-2">
          <span className="pr-4">種別</span>
          <DropDown id="billing" label="課金" param="/enums/list_by_enum_id/?emum_id=crop.chargeType" value={billing} changeAction={handleBilling} />
          <DropDown id="farm" label="農場" param="/enums/list_by_enum_id/?emum_id=farm.type" value={farm} changeAction={handleFarm} />
          <DropDown id="item" label="アイテム" param="/enums/list_by_enum_id/?emum_id=crop.itemType" value={item} changeAction={handleItem} />
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
        <OneInputText label="説明" value={description} changeAction={handleDescription} />
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
        <DropDown id="area" label="ステータス" param="/enums/list_by_enum_id/?emum_id=crop.status" value={status} changeAction={handleStatus} />
        {/* <FreebieRadioGroup param="/enums/list_by_enum_id/?emum_id=crop.prize" defaultValue={freebie} changeAction={handleFreebie} type="number" /> */}
        <FormControl component="fieldset" className="m-2 w-50">
          <FormLabel component="legend">景品</FormLabel>
          <RadioGroup defaultValue="0" aria-label="freebie" name="customized-radios" style={{ display: "inline" }} value={freebie} onChange={handleFreebie}>
            <FormControlLabel value="0" control={<StyledRadio />} label="ポイントのみ" />
            <FormControlLabel value="1" control={<StyledRadio />} label="旬の作物" />
            <FormControlLabel value="2" control={<StyledRadio />} label="収穫可能" />
            <FormControlLabel value="3" control={<StyledRadio />} label="加工品のみ" />
            <FormControlLabel value="4" control={<StyledRadio />} label="準備中" />
          </RadioGroup>
        </FormControl>
        <OneInputText label="初期レベル" value={initiallevel} changeAction={handleInitialLevel} type="number" />
        <OneInputText label="MAXレベル" value={maxlevel} changeAction={handleMaxLevel} />
        <OneInputText label="収穫最適レベル" value={harvestlevel} changeAction={handleHarvestLevel} />
        <OneInputText label="収穫最短レベル" value={shortestharvestlevel} changeAction={handleShortestHarvestLevel} />
        <OneInputText label="収穫最長レベル" value={longestharvestlevel} changeAction={handleLongestHarvestLevel} />
        <OneInputText label="レベル日数" value={leveldays} changeAction={handleLevelDays} />
      </div>
      <div>
        <NormalButton label="更　新" onClick={onCropMasterCreate} />
        <Link to="/UserCropMaster">
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
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

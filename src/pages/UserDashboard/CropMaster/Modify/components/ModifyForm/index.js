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
import { apiCropMasterById, apiDeleteCropMasterByid } from 'services/apis/cropmasters';


function ModifyForm() {

  let data = useLocation();

  let cropmasterId = data.state !== undefined ? data.state.id : localStorage.getItem("cropmasterId");

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
    setDescription(res.explanation);
    setCropAlias(res.alias);
    setDayTime(res.day_length);
    setEvening(res.evening_length);
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

    var data = {
      cropid: cropid,
      area: area,
      cropname: cropname,
      level: level,
      billing: billing,
      farm: farm,
      item: item,
      requiredpoints: requiredpoints,
      earnpoints: earnpoints,
      upperlimitpoint: upperlimitpoint,
      additionpoint: additionpoint,
      ngtime: ngtime,
      oktime: oktime,
      description: description,
      cropalias: cropalias,
      daytime: daytime,
      evening: evening,
      migration: migration,
      selectedStartDate: selectedStartDate,
      cultivationperiod: cultivationperiod,
      plantinglimit: plantinglimit,
      status: status,
      initiallevel: initiallevel,
      maxlevel: maxlevel,
      harvestlevel: harvestlevel,
      shortestharvestlevel: shortestharvestlevel,
      longestharvestlevel: longestharvestlevel,
      leveldays: leveldays
    }

    console.log(data);

  }

  const onDeleteCropMaster = () => {

    apiDeleteCropMasterByid(localStorage.getItem("cropmasterId"))
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
      <div className="font-size-lg font-weight-bold">Modify CropMaster</div>
      <Divider className="my-4" />
      {cropid &&
        <div>
          <OneInputText label="作物ID" defaultValue={cropid} changeAction={handleCropId} />
          <DropDown id="area" label="地域" param="/enums/all/?enum_id=member.area2" value={area} changeAction={handleArea} />
          <OneInputText label="作物名" defaultValue={cropname} changeAction={handleCropName} />
          <DropDown id="area" label="レベル" param="/enums/all/?enum_id=member.area2" value={level} changeAction={handleLevel} type="number" />

          <div className="m-2">
            <span className="pr-4">種別</span>
            <DropDown id="area" label="課金" param="/enums/all/?enum_id=member.area2" value={billing} changeAction={handleBilling} />
            <DropDown id="area" label="農場" param="/enums/all/?enum_id=member.area2" value={farm} changeAction={handleFarm} />
            <DropDown id="area" label="アイテム" param="/enums/all/?enum_id=member.area2" value={item} changeAction={handleItem} />
          </div>
          <OneInputText label="必須ポイント" defaultValue={requiredpoints} changeAction={handleRequiredPoints} type="number" />

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
          <OneInputText label="説明" defaultValue={description} changeAction={handleDescription} />
          <OneInputText label="作物エイリアス" defaultValue={cropalias} changeAction={handleCropAlias} />

          <div className="m-2">
            <span className="pr-4">長さ(ms)</span>
            <OneInputText label="日中" defaultValue={daytime} changeAction={handleDayTime} type="number" />
            <OneInputText label="夜" defaultValue={evening} changeAction={handleEvening} type="number" />
            <OneInputText label="移行" defaultValue={migration} changeAction={handleMigration} type="number" />
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
          <DropDown id="area" label="ステータス" param="/enums/all/?enum_id=member.area2" value={status} changeAction={handleStatus} />
          <FormControl component="fieldset" className="m-2 w-50">
            <FormLabel component="legend">景品</FormLabel>
            <RadioGroup defaultValue="0" aria-label="freebie" name="customized-radios" style={{ display: "inline" }} value={freebie.toString()} onChange={handleFreebie}>
              <FormControlLabel value="0" control={<StyledRadio />} label="ポイントのみ" />
              <FormControlLabel value="1" control={<StyledRadio />} label="旬の作物" />
              <FormControlLabel value="2" control={<StyledRadio />} label="収穫可能" />
              <FormControlLabel value="3" control={<StyledRadio />} label="加工品のみ" />
              <FormControlLabel value="4" control={<StyledRadio />} label="準備中" />
            </RadioGroup>
          </FormControl>
          <OneInputText label="初期レベル" defaultValue={initiallevel} changeAction={handleInitialLevel} type="number" />
          <OneInputText label="MAXレベル" defaultValue={maxlevel} changeAction={handleMaxLevel} />
          <OneInputText label="収穫最適レベル" defaultValue={harvestlevel} changeAction={handleHarvestLevel} />
          <OneInputText label="収穫最短レベル" defaultValue={shortestharvestlevel} changeAction={handleShortestHarvestLevel} />
          <OneInputText label="収穫最長レベル" defaultValue={longestharvestlevel} changeAction={handleLongestHarvestLevel} />
          <OneInputText label="レベル日数" defaultValue={leveldays} changeAction={handleLevelDays} />
        </div>
      }
      <div>
        <NormalButton label="更　新" onClick={onCropMasterUpdate} />
        <NormalButton label="削　除" onClick={onDeleteCropMaster} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);

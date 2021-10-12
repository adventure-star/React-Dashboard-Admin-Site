import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider,
  TextField
} from '@material-ui/core';

import OneInputText from 'components/OneInputText';
import NormalButton from 'components/NormalButton';
import { Link, useHistory } from 'react-router-dom';
import { apiItemMasterCreate } from 'services/apis/itemmasters';
import SaveModal from 'components/SaveModal';
import TextArea from 'components/TextArea';
import LongTextArea from 'components/LongTextArea';


function AddForm() {

  let history = useHistory();

  const [cropid, setCropId] = useState("");
  const handleCropId = event => {
    setCropId(event.target.value);
  };

  const [itemid, setItemId] = useState("");
  const handleItemId = event => {
    setItemId(event.target.value);
  };

  const [categoryid, setCategoryId] = useState("");
  const handleCategoryId = event => {
    setCategoryId(event.target.value);
  };

  const [actionid, setActionId] = useState("");
  const handleActionId = event => {
    setActionId(event.target.value);
  };

  const [name, setName] = useState("");
  const handleName = event => {
    setName(event.target.value);
  };

  const [iconname, setIconName] = useState("");
  const handleIconName = event => {
    setIconName(event.target.value);
  };

  const [purchasepoints, setPurchasePoints] = useState("");
  const handlePurchasePoints = event => {
    setPurchasePoints(event.target.value);
  };

  const [originalprice, setOriginalPrice] = useState("");
  const handleOriginalPrice = event => {
    setOriginalPrice(event.target.value);
  };

  const [lifetype, setLifeType] = useState("");
  const handleLifeType = event => {
    setLifeType(event.target.value);
  };

  const [lifecount, setLifeCount] = useState("");
  const handleLifeCount = event => {
    setLifeCount(event.target.value);
  };

  const [impacttype, setImpactType] = useState("");
  const handleImpactType = event => {
    setImpactType(event.target.value);
  };

  const [impactdata, setImpactData] = useState("");
  const handleImpactData = event => {
    setImpactData(event.target.value);
  };

  const [fieldwatercontent, setFieldWaterContent] = useState("");
  const handleFieldWaterContent = event => {
    setFieldWaterContent(event.target.value);
  };

  const [fieldnutrition, setFieldNutrition] = useState("");
  const handleFieldNutrition = event => {
    setFieldNutrition(event.target.value);
  };

  const [cropgrowth, setCropGrowth] = useState("");
  const handleCropGrowth = event => {
    setCropGrowth(event.target.value);
  };

  const [naturalenv, setNaturalEnv] = useState("");
  const handleNaturalEnv = event => {
    setNaturalEnv(event.target.value);
  };

  const [eventid, setEventId] = useState("");
  const handleEventId = event => {
    setEventId(event.target.value);
  };

  const [briefexplanation, setBriefExplanation] = useState("");
  const handleBriefExplanation = event => {
    setBriefExplanation(event.target.value);
  };

  const [detailedexplanation, setDetailedExplanation] = useState("");
  const handleDetailedExplanation = event => {
    setDetailedExplanation(event.target.value);
  };

  const [diarydescription, setDiaryDescription] = useState("");
  const handleDiaryDescription = event => {
    setDiaryDescription(event.target.value);
  };

  const [status, setStatus] = useState("");
  const handleStatus = event => {
    setStatus(event.target.value);
  };

  const [spare1, setSpare1] = useState("");
  const handleSpare1 = event => {
    setSpare1(event.target.value);
  };
  
  const onCreateItemMaster = () => {

    toggle();

    var data = {
      crop_id: cropid,
      item_id: itemid,
      category_id: categoryid,
      action_id: actionid,
      name: name,
      icon_name: iconname,
      point: purchasepoints,
      reserved2: originalprice,
      life_span_type: lifetype,
      life_span: lifecount,
      env_type: impacttype,
      env_data: impactdata,
      moisture: fieldwatercontent,
      nutrition: fieldnutrition,
      growth: cropgrowth,
      environment: naturalenv,
      event_id: eventid,
      description: briefexplanation,
      note: detailedexplanation,
      diary: diarydescription,
      status: status,
      reserved1: spare1
    }
    console.log(data);

    apiItemMasterCreate(data)
    .then(res => {
      if (res) {
        history.push('/AdminItemMaster')
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
      <div className="font-size-lg font-weight-bold">Add New ItemMaster</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="作物ID" value={cropid} changeAction={handleCropId} type="number" />
        <OneInputText label="アイテムID" value={itemid} changeAction={handleItemId} type="number" />
        <OneInputText label="カテゴリID" value={categoryid} changeAction={handleCategoryId} type="number" />
        <OneInputText label="アクションID" value={actionid} changeAction={handleActionId} type="number" />
        <TextArea label="名称" value={name} changeAction={handleName} />
        <OneInputText label="アイコン名" value={iconname} changeAction={handleIconName} />
        <OneInputText label="購入ポイント" value={purchasepoints} changeAction={handlePurchasePoints} type="number" />
        <OneInputText label="割引時の元値" value={originalprice} changeAction={handleOriginalPrice} type="number" />
        <OneInputText label="寿命種別" value={lifetype} changeAction={handleLifeType} type="number" />
        <OneInputText label="寿命カウンタ" value={lifecount} changeAction={handleLifeCount} type="number" />
        <OneInputText label="影響種別" value={impacttype} changeAction={handleImpactType} type="number" />
        <OneInputText label="影響データ" value={impactdata} changeAction={handleImpactData} type="number" />
        <OneInputText label="畑水分量" value={fieldwatercontent} changeAction={handleFieldWaterContent} type="number" />
        <OneInputText label="畑栄養度" value={fieldnutrition} changeAction={handleFieldNutrition} type="number" />
        <OneInputText label="作物成長度" value={cropgrowth} changeAction={handleCropGrowth} type="number" />
        <OneInputText label="自然環境" value={naturalenv} changeAction={handleNaturalEnv} type="number" />
        <OneInputText label="イベントID" value={eventid} changeAction={handleEventId} />
        <TextArea label="簡易説明" value={briefexplanation} changeAction={handleBriefExplanation} />
        <LongTextArea label="詳細説明" value={detailedexplanation} changeAction={handleDetailedExplanation} />
        <LongTextArea label="日記記述" value={diarydescription} changeAction={handleDiaryDescription} />
        <OneInputText label="ステータス" value={status} changeAction={handleStatus} type="number" />
        <OneInputText label="予備１" value={spare1} changeAction={handleSpare1} type="number" />
      </div>
      <div>
        <NormalButton label="更　新" onClick={toggle}/>
        <Link to="/AdminItemMaster">
          <NormalButton label="戻　る" />
        </Link>
        <SaveModal state={modal} onNo={toggle} onYes={onCreateItemMaster} />
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

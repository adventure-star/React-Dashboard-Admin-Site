import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';
import DropDown from 'components/DropDown';
import OneInputText from 'components/OneInputText';
import TextArea from 'components/TextArea';
import NormalButton from 'components/NormalButton';
import { Link, useHistory } from 'react-router-dom';
import { apiInvoiceCreate } from 'services/apis/invoices';
import Moment from 'moment';
import SaveModal from 'components/SaveModal';


function AddForm(props) {

  localStorage.setItem("memberId", props.userInfo.value.member.id);

  let history = useHistory();

  const [farmid, setFarmId] = useState("");
  const handleFarmId = event => {
    setFarmId(event.target.value);
  };

  const [good, setGood] = useState("");
  const handleGood = event => {
    setGood(event.target.value);
  };

  const [memberid, setMemberId] = useState(localStorage.getItem("memberId"));

  const [registrationnumber, setRegistrationNumber] = useState("");
  const handleRegistrationNumber = event => {
    setRegistrationNumber(event.target.value);
  };

  const [lastname, setLastName] = useState("");
  const handleLastName = event => {
    setLastName(event.target.value);
  };

  const [firstname, setFirstName] = useState("");
  const handleFirstName = event => {
    setFirstName(event.target.value);
  };

  const [surname, setSurName] = useState("");
  const handleSurName = event => {
    setSurName(event.target.value);
  };

  const [mei, setMei] = useState("");
  const handleMei = event => {
    setMei(event.target.value);
  };

  const [postalcode, setPostalCode] = useState("");
  const handlePostalCode = event => {
    setPostalCode(event.target.value);
  };

  const [address1, setAddress1] = useState("");
  const handleAddress1 = event => {
    setAddress1(event.target.value);
  };

  const [address11, setAddress11] = useState("");
  const handleAddress11 = event => {
    setAddress11(event.target.value);
  };

  const [address2, setAddress2] = useState("");
  const handleAddress2 = event => {
    setAddress2(event.target.value);
  };

  const [tel, setTel] = useState("");
  const handleTel = event => {
    setTel(event.target.value);
  };

  const [cellphonenumber, setCellPhoneNumber] = useState("");
  const handleCellPhoneNumber = event => {
    setCellPhoneNumber(event.target.value);
  };

  const [note, setNote] = useState("");
  const handleNote = event => {
    setNote(event.target.value);
  };

  const [reserve, setReserve] = useState("");
  const handleReserve = event => {
    setReserve(event.target.value);
  };

  const onInvoiceCreate = () => {

    toggle();

    var data = {
      farm_id: farmid,
      product_id: good,
      member_id: memberid,
      addr_id: registrationnumber,
      name_kanji_sei: lastname,
      name_kanji_mei: firstname,
      name_kana_sei: surname,
      name_kana_mei: mei,
      zip: postalcode,
      area: address1,
      str_area: null,
      addr1: address11,
      addr2: address2,
      tel: tel,
      tel_mobile: cellphonenumber,
      memo: note,
      reserved1: reserve,
      str_reserved1: null,
    }

    console.log(data);

    apiInvoiceCreate(data)
      .then(res => {
        if (res) {
          history.push('/UserInvoices')
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
      <div className="font-size-lg font-weight-bold">Add New Invoice</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="農場ID" value={farmid} changeAction={handleFarmId} type="number" />
        <DropDown label="商品ID" param="/enums/all?enum_id=products" value={good} changeAction={handleGood} />
        <OneInputText label="会員ID" value={memberid} type="number" />
        <OneInputText label="登録番号" value={registrationnumber} changeAction={handleRegistrationNumber} type="number" />
        <TextArea label="姓" value={lastname} changeAction={handleLastName} />
        <TextArea label="名" value={firstname} changeAction={handleFirstName} />
        <TextArea label="セイ" value={surname} changeAction={handleSurName} />
        <TextArea label="メイ" value={mei} changeAction={handleMei} />
        <OneInputText label="郵便番号" value={postalcode} changeAction={handlePostalCode} />
        <DropDown label="住所１" param="/enums/all/?enum_id=member.area2" value={address1} changeAction={handleAddress1} />
        <TextArea label="住所1" value={address11} changeAction={handleAddress11} />
        <TextArea label="住所2" value={address2} changeAction={handleAddress2} />
        <OneInputText label="TEL" value={tel} changeAction={handleTel} />
        <OneInputText label="携帯電話番号" value={cellphonenumber} changeAction={handleCellPhoneNumber} />
        <TextArea label="メモ" value={note} changeAction={handleNote} />
        <OneInputText label="予備" value={reserve} changeAction={handleReserve} type="number" />
        <OneInputText label="更新日" value="" disabled />
      </div>
      <div>
        <NormalButton label="更　新" onClick={toggle} />
        <Link to="/UserInvoices">
          <NormalButton label="戻　る" />
        </Link>
        <SaveModal state={modal} onNo={toggle} onYes={onInvoiceCreate}/>
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

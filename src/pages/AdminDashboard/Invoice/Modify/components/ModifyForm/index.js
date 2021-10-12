import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Divider
} from '@material-ui/core';
import DropDown from 'components/DropDown';
import OneInputText from 'components/OneInputText';
import TextArea from 'components/TextArea';
import NormalButton from 'components/NormalButton';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { apiInvoiceById, apiUpdateInvoice } from 'services/apis/invoices';
import UpdateModal from 'components/UpdateModal';
import DeleteModal from 'components/DeleteModal';

function ModifyForm() {

  let data = useLocation();

  let invoiceId = data.state !== undefined ? data.state.id : localStorage.getItem("invoiceId");

  let history = useHistory();

  const [farmid, setFarmId] = useState("");

  const [good, setGood] = useState("");
  const handleGood = event => {
    setGood(event.target.value);
  };

  const [memberid, setMemberId] = useState("");
  const handleMemberId = event => {
    setMemberId(event.target.value);
  };

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

  const [updatedate, setUpdateDate] = useState("");

  useEffect(() => {

    localStorage.setItem("invoiceId", invoiceId);

    getInvoice();

  }, []);

  const getInvoice = async () => {

    let invoiceId = data.state !== undefined ? data.state.id : localStorage.getItem("invoiceId");

    const res = await apiInvoiceById(invoiceId);

    setFarmId(res.farm_id);
    setGood(res.product_id);
    setMemberId(res.member_id);
    setRegistrationNumber(res.addr_id);
    setLastName(res.name_kanji_sei);
    setFirstName(res.name_kanji_mei);
    setSurName(res.name_kana_sei);
    setMei(res.name_kana_mei);
    setPostalCode(res.zip);
    setAddress1(res.area);
    setAddress11(res.addr1);
    setAddress2(res.addr2);
    setTel(res.tel);
    setCellPhoneNumber(res.tel_mobile);
    setNote(res.memo);
    setReserve(res.reserved1);
    setUpdateDate(res.update_date);

    console.log(res);

  }

  const onInvoiceModify = () => {

    updatetoggle();

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
      addr1: address11,
      addr2: address2,
      tel: tel,
      tel_mobile: cellphonenumber,
      memo: note,
      reserved1: reserve,
      update_date: updatedate
    }

    console.log(data);

    apiUpdateInvoice(localStorage.getItem("invoiceId"), data)
      .then(res => {
        if (res) {
          history.push('/AdminInvoices')
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

  const [updatemodal, setUpdateModal] = useState(false);
  const updatetoggle = () => setUpdateModal(!updatemodal);

  return (
    <Card className="p-4 mb-4">
      <div className="font-size-lg font-weight-bold">Modify Invoice</div>
      <Divider className="my-4" />
      <div>
        <OneInputText label="農場ID" value={farmid} disabled/>
        <DropDown label="商品ID" param="/enums/all?enum_id=products" defaultValue={good} changeAction={handleGood} />
        <OneInputText label="会員ID" value={memberid} changeAction={handleMemberId} type="number" />
        <OneInputText label="登録番号" value={registrationnumber} changeAction={handleRegistrationNumber} type="number" />
        <TextArea label="姓" value={lastname} changeAction={handleLastName} />
        <TextArea label="名" value={firstname} changeAction={handleFirstName} />
        <TextArea label="セイ" value={surname} changeAction={handleSurName} />
        <TextArea label="メイ" value={mei} changeAction={handleMei} />
        <OneInputText label="郵便番号" value={postalcode} changeAction={handlePostalCode} />
        <DropDown label="住所1" param="/enums/all?enum_id=member.area2" defaultValue={address1} changeAction={handleAddress1} />
        <TextArea label="住所1" value={address11} changeAction={handleAddress11} />
        <TextArea label="住所2" value={address2} changeAction={handleAddress2} />
        <OneInputText label="TEL" value={tel} changeAction={handleTel} />
        <OneInputText label="携帯電話番号" value={cellphonenumber} changeAction={handleCellPhoneNumber} />
        <TextArea label="メモ" value={note} changeAction={handleNote} />
        <TextArea label="予備" value={reserve} changeAction={handleReserve} type="number" />
        <OneInputText label="更新日" value={updatedate} disabled/>
      </div>
      <div>
        <NormalButton label="更　新" onClick={updatetoggle} />
        <Link to="/AdminInvoices">
          <NormalButton label="戻　る" />
        </Link>
        <UpdateModal state={updatemodal} onNo={updatetoggle} onYes={onInvoiceModify} />
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

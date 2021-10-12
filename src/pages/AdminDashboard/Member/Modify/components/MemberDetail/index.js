import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import NormalButton from 'components/NormalButton';
import PointLogTable from '../PointLogTable';
import FarmDataTable from '../FarmDataTable';
import ItemPurchaseTable from '../ItemPurchaseTable';
import ItemUseTable from '../ItemUseTable';
import ItemPossessionTable from '../ItemPossessionTable';
import { useLocation } from 'react-router';

function MembersTable() {

  let data = useLocation();

  let memberId = data.state !== undefined ? data.state.id : localStorage.getItem("userId");

  useEffect(() => {

    localStorage.setItem("userId", memberId);

    memberId = data.state !== undefined ? data.state.id : localStorage.getItem("userId");

  }, [memberId]);


  const [pointlog, setPointLog] = useState(true);
  const [farmdata, setFarmData] = useState(false);
  const [itempurchase, setItemPurchase] = useState(false);
  const [itemuse, setItemUse] = useState(false);
  const [itempossession, setItemPossession] = useState(false);

  const viewPointLog = () => {
    setPointLog(true);
    setFarmData(false);
    setItemPurchase(false);
    setItemUse(false);
    setItemPossession(false);
  }
  const viewFarmData = () => {
    setPointLog(false);
    setFarmData(true);
    setItemPurchase(false);
    setItemUse(false);
    setItemPossession(false);
  }
  const viewItemPurchase = () => {
    setPointLog(false);
    setFarmData(false);
    setItemPurchase(true);
    setItemUse(false);
    setItemPossession(false);
  }
  const viewItemUse = () => {
    setPointLog(false);
    setFarmData(false);
    setItemPurchase(false);
    setItemUse(true);
    setItemPossession(false);
  }
  const viewItemPossession = () => {
    setPointLog(false);
    setFarmData(false);
    setItemPurchase(false);
    setItemUse(false);
    setItemPossession(true);
  }

  return (
    <>
      <div>
        <NormalButton label="pointログ" onClick={viewPointLog} />
        <NormalButton label="農場データ" onClick={viewFarmData} />
        <NormalButton label="アイテム購入" onClick={viewItemPurchase} />
        <NormalButton label="アイテム利用" onClick={viewItemUse} />
        <NormalButton label="所持アイテム" onClick={viewItemPossession} />
      </div>

      {pointlog && <PointLogTable id={memberId} />}
      {farmdata && <FarmDataTable id={memberId} />}
      {itempurchase && <ItemPurchaseTable id={memberId} />}
      {itemuse && <ItemUseTable id={memberId} />}
      {itempossession && <ItemPossessionTable id={memberId} />}
    </>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(MembersTable);

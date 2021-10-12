import React, { useState } from 'react';
import { connect } from 'react-redux';

import NormalButton from 'components/NormalButton';
import PointLogTable from '../PointLogTable';
import FarmDataTable from '../FarmDataTable';
import ItemPurchaseTable from '../ItemPurchaseTable';
import ItemUseTable from '../ItemUseTable';
import ItemPossessionTable from '../ItemPossessionTable';

function MembersTable(props) {

  localStorage.setItem("memberId", props.userInfo.value.member.id);

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

      {pointlog && <PointLogTable id={localStorage.getItem("memberId")} />}
      {farmdata && <FarmDataTable id={localStorage.getItem("memberId")} />}
      {itempurchase && <ItemPurchaseTable id={localStorage.getItem("memberId")} />}
      {itemuse && <ItemUseTable id={localStorage.getItem("memberId")} />}
      {itempossession && <ItemPossessionTable id={localStorage.getItem("memberId")} />}
    </>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(MembersTable);

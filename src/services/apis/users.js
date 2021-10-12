import { jsonQuery, query, getLocalToken, generatePagenationParameters, downloadquery } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiMembers(searchParams) {
  return await query(`/member/all/`, { searchParams });
}

export async function apiMemberSearch(searchParams) {
  return await jsonQuery(`/member/search/`, 'POST', searchParams, true);
}

export async function apiMemberById(id) {
  return await query(`/member/${id}/`);
}

export async function apiUpdateMember(id, data) {
  return await jsonQuery(`/member/${id}/`, 'PUT', data, true);
}

export async function apiMemberStatuses() {
  return await jsonQuery(`/enums/all/?enum_id=member.status`);
}

export async function apiMemberOptions(param) {
  return await jsonQuery(`/enums/all/?enum_id=${param}`);
}

export async function apiMemberPointLogsById(id) {
  return await jsonQuery(`/member_point_log/all?member_id=${id}`);
}

export async function apiMemberFarmDataById(id) {
  return await query(`/member/${id}/farms/`);
}

export async function apiMemberItemPurchaseById(id) {
  return await jsonQuery(`/member/${id}/item_purchases/`);
}

export async function apiMemberItemUseById(id) {
  return await jsonQuery(`/member/${id}/items_in_use/`);
}

export async function apiMemberItemPossessionById(id) {
  return await jsonQuery(`/member/${id}/owner_items/`);
}

export async function apiMemberCreate(data) {
  const res = await jsonQuery(`/member/create/`, 'POST', data, true);
  return res;
}

export async function apiMemberMessageClear() {
  const res = await jsonQuery(`/member/clear_messages/`);
  return res;
}

export async function apiMemberRefund(id) {
  const res = await jsonQuery(`/member/${id}/refund_all/`);
  return res;
}

export async function apiMemberDeleteById(id) {
  return await jsonQuery(`/member/${id}/`, 'DELETE', {}, true);

}

export async function apiMemberAddPointById(id, data) {
  return await jsonQuery(`/member/${id}/add_point/`, 'POST', data, true);
}

export async function deleteMember(id) {
  return fetch("http://ec2-35-72-6-100.ap-northeast-1.compute.amazonaws.com/api/v1/member" + '/' + id, {
    method: 'delete'
  })
  .then(response => response.json());
}

export async function apiMembersCSV() {
  return await downloadquery(`/member/export_csv/`, "member");
}

import { jsonQuery, query, getLocalToken, generatePagenationParameters, downloadquery } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiItemMasters(item_type_id, searchParams) {
  return await query(`/item_master/list_by_item_type/?item_type=${item_type_id}`, {searchParams});
}

export async function apiItemMasterById(id) {
  return await query(`/item_master/${id}/`);
}

export async function apiItemMasterCreate(data) {
  const res = await jsonQuery(`/item_master/create/`, 'POST', data, true);
  return res;
}

export async function apiUpdateItemMaster(id, data) {
  return await jsonQuery(`/item_master/${id}/`, 'PUT', data);
}

export async function apiDeleteItemMasterById(id) {
  return await jsonQuery(`/item_master/${id}/`, 'DELETE', {}, true);
}

export async function apiItemMasterCSV() {
  return await downloadquery(`/item_master/export_csv/`, "item_master");
}

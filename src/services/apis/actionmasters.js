import { jsonQuery, query, getLocalToken, generatePagenationParameters, downloadquery } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiActionMasters(crop_id, searchParams) {
  return await query(`/action_master/actions_by_crop_id/${crop_id}/`, {searchParams});
}

export async function apiActionMasterById(id) {
  return await query(`/action_master/${id}/`);
}

export async function apiCreateActionMaster(data) {
  return await jsonQuery(`/action_master/create/`, 'POST', data);
}

export async function apiUpdateActionMaster(id, data) {
  return await jsonQuery(`/action_master/${id}/`, 'PUT', data);
}

export async function apiDeleteActionMasterById(id) {
  return await jsonQuery(`/action_master/${id}/`, 'DELETE', {}, true);
}

export async function apiActionMastersCSV() {
  return await downloadquery(`/action_master/export_csv/`, "action_master");
}

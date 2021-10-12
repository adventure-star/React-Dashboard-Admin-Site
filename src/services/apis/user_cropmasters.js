import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiCropMasters(searchParams) {
  return await query(`/crop_master/all`, {searchParams});
}

export async function apiCropMasterById(id) {
  return await query(`/crop_master/${id}/`);
}

export async function apiUpdateCropMaster(id, data) {
  return await jsonQuery(`/crop_master/${id}/`, 'PUT', data);
}

export async function apiUserCropMastersCSV(member_id) {
  return await downloadquery(`/send_list/export_csv_by_member_id/${member_id}/`, "user_crop_master");
}

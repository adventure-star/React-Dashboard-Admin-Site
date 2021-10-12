import { jsonQuery, query, getLocalToken, generatePagenationParameters, downloadquery } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiUserFarmerMasterFarmDataById(id, searchParams) {
  return await query(`/member/${id}/farms/`, {searchParams});
}

export async function apiUserFarmerMasterCropDataById(id, searchParams) {
  return await query(`/member/${id}/crops/`, {searchParams});
}

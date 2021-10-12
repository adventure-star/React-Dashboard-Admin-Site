import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiFarmerMasters(searchParams) {
  return await query(`/farm_data/all`, {searchParams});
}

export async function apiFarmerMasterById(id) {
  return await query(`/crop_master/${id}/`);
}

export async function apiFarmerCropMaster(id, data) {
  return await jsonQuery(`/crop_master/${id}/`, 'PUT', data);
}


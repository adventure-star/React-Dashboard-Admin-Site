import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiRegions(searchParams) {
  return await query(`/region/all/`, {searchParams});
}

export async function apiRegionCreate(data) {
  const res = await jsonQuery(`/region/create/`, 'POST', data, true);
  return res;
}

export async function apiRegionById(id) {
  return await query(`/region/${id}/`);
}

export async function apiUpdateRegion(id, data) {
  return await jsonQuery(`/region/${id}/`, 'PUT', data);
}

export async function apiDeleteRegionById(id) {
  return await jsonQuery(`/region/${id}/`, 'DELETE', {}, true);
}

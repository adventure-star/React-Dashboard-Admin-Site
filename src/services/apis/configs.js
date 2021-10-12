import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiConfigs(searchParams) {
  return await query(`/un_site_info/all/`, {searchParams});
}

export async function apiConfigById(id) {
  return await query(`/un_site_info/${id}/`);
}

export async function apiCreateConfig(data) {
  return await jsonQuery(`/un_site_info/create/`, 'POST', data);
}

export async function apiUpdateConfig(id, data) {
  return await jsonQuery(`/un_site_info/${id}/`, 'PUT', data);
}

export async function apiDeleteConfig(id) {
  return await jsonQuery(`/un_site_info/${id}/`, 'DELETE', {}, true);
}

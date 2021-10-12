import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiEnums(searchParams) {
  return await query(`/enums/all_ids/`, {searchParams});
}

export async function apiEnumById(id, searchParams) {
  return await query(`/enums/all/?enum_id=${id}`, {searchParams});
}

export async function apiCreateEnum(data) {
  return await jsonQuery(`/enums/create/`, 'POST', data);
}

export async function apiUpdateEnum(id, data) {
  return await jsonQuery(`/enums/${id}/`, 'PUT', data);
}

export async function apiEnumDetailById(id) {
  return await query(`/enums/${id}/`);
}

export async function apiDeleteEnumById(id) {
  return await jsonQuery(`/enums/${id}/`, 'DELETE', {}, true);
}

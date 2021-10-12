import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiEvents(searchParams) {
  return await query(`/event/all/`, {searchParams});
}

export async function apiEventById(id) {
  return await query(`/event/${id}/`);
}

export async function apiCreateEvent(data) {
  return await jsonQuery(`/event/create/`, 'POST', data);
}

export async function apiUpdateEvent(id, data) {
  return await jsonQuery(`/event/${id}/`, 'PUT', data);
}

export async function apiDeleteEventById(id) {
  return await jsonQuery(`/event/${id}/`, 'DELETE', {}, true);
}

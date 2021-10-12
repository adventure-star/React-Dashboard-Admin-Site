import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiDropdown(queryString, searchParams) {
  return await query(`${queryString}`, { searchParams });
}

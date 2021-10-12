import { jsonQuery, query, getLocalToken, generatePagenationParameters } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiOverview1() {
  return await query(`/overview/member_sumarize`);
}

export async function apiOverview2() {
  return await query(`/overview/petas`);
}

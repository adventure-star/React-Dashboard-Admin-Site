import { jsonQuery, query, getLocalToken, generatePagenationParameters, downloadquery } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiInvoices(searchParams) {
  return await query(`/send_list/all/`, {searchParams});
}

export async function apiInvoiceById(id) {
  return await query(`/send_list/${id}/`);
}

export async function apiUpdateInvoice(id, data) {
  return await jsonQuery(`/send_list/${id}/`, 'PUT', data);
}

export async function apiUserInvoicesCSV(member_id) {
  return await downloadquery(`/send_list/export_csv_by_member_id/${member_id}/`, "user-invoices");
}

import { jsonQuery, query, getLocalToken, generatePagenationParameters, downloadquery } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiInvoices(searchParams) {
  return await query(`/send_list/all/`, {searchParams});
}

export async function apiInvoiceWaitList(searchParams) {
  return await query(`/send_list/wait_list/`, {searchParams});
}

export async function apiInvoiceById(id) {
  return await query(`/send_list/${id}/`);
}

export async function apiUpdateInvoice(id, data) {
  return await jsonQuery(`/send_list/${id}/`, 'PUT', data, true);
}

export async function apiInvoiceCreate(data) {
  return await jsonQuery(`/send_list/create/`, 'POST', data, true);
}

export async function apiInvoicesCSV() {
  return await downloadquery(`/send_list/export_csv/`, "invoices");
}

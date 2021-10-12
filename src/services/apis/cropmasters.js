import { jsonQuery, query, getLocalToken, generatePagenationParameters, downloadquery } from "./common";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiCropMasters(searchParams) {
  return await query(`/crop_master/all`, {searchParams});
}

export async function apiCropMastersDataReflection() {
  return await jsonQuery(`/crop_master/data_reflection/`, 'POST', {}, true);
}

export async function apiCropMasterCreate(data) {
  const res = await jsonQuery(`/crop_master/create/`, 'POST', data, true);
  return res;
}

export async function apiCropMasterById(id) {
  return await query(`/crop_master/${id}/`);
}

export async function apiCropMasterDuplicate(id) {
  return await jsonQuery(`/crop_master/${id}/dup/`, 'POST');
}

export async function apiUpdateCropMaster(id, data) {
  return await jsonQuery(`/crop_master/${id}/`, 'PUT', data);
}

export async function apiDeleteCropMasterByid(id) {
  return await jsonQuery(`/crop_master/${id}/`, 'DELETE', {}, true);
}

export async function apiCropMasterSubItemById(id) {
  const res = await query(`/un_page_data/crop/${id}/`);
  return res;
}

export async function apiCropMasterSubItemCreate(data) {
  const res = await jsonQuery(`/un_page_data/create`, 'POST', data, true);
  return res;
}

export async function apiCropMasterSubItemUpdate(id, data) {
  console.log("==id", data);
  const res = await jsonQuery(`/un_page_data/${id}/`, 'PUT', data, true);
  return res;
}

export async function apiPestList(searchParams) {
  return await query(`/disease/all`, {searchParams});
}

export async function apiPestListById(crop_id, searchParams) {
  return await query(`/crop_disease_info/diseases_by_crop_id/${crop_id}/`, {searchParams});
}

export async function apiCropMasterHashDataById(id) {
  return await query(`/crop_master/${id}/un_hash_data/`);
}

export async function apiActionListByCropMasterId(id) {
  return await query(`/crop_master/${id}/actions/`);
}

export async function apiCropMasterPetAdd(data) {
  return await jsonQuery(`/crop_disease_info/create/`, 'POST', data, true);
}

export async function apiHashDataUpdate(id, data) {
  return await jsonQuery(`/crop_master/${id}/un_hash_data/`, 'PUT', data, true);
}

export async function apiCropMasterPestRemove(id) {
  return await jsonQuery(`/crop_disease_info/${id}/`, 'DELETE', {}, true);
}

export async function apiCropMastersCSV() {
  return await downloadquery(`/crop_master/export_csv/`, "crop_master");
}

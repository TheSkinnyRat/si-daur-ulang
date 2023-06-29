import CONFIG from '@lib/api/config';

const ENDPOINTS = {
  SIGNIN: `${CONFIG.BASE_URL}/signin`,
  SIGNUP: `${CONFIG.BASE_URL}/signup`,
  PROFILE: `${CONFIG.BASE_URL}/profile`,
  ADMIN_USERS: `${CONFIG.BASE_URL}/admin/users`,
  ADMIN_USER: (id: number) => `${CONFIG.BASE_URL}/admin/users/${id}`,
  USER_RECYCLES: `${CONFIG.BASE_URL}/user/recycles`,
  USER_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/user/recycles/${id}`,
  USER_POINT: `${CONFIG.BASE_URL}/user/point`,
  USER_POINT_HISTORIES: `${CONFIG.BASE_URL}/user/point/histories`,
  USER_POINT_WITHDRAWS: `${CONFIG.BASE_URL}/user/point/withdraws`,
  DRIVER_RECYCLES_REQUEST: `${CONFIG.BASE_URL}/driver/recycles/request`,
  DRIVER_RECYCLES_PICKUP: `${CONFIG.BASE_URL}/driver/recycles/pickup`,
  DRIVER_RECYCLES_PICKED: `${CONFIG.BASE_URL}/driver/recycles/picked`,
  DRIVER_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/driver/recycles/${id}`,
  STAFF_RECYCLES: `${CONFIG.BASE_URL}/staff/recycles`,
  STAFF_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/staff/recycles/${id}`,
  STAFF_RECYCLES_REQUEST: `${CONFIG.BASE_URL}/staff/recycles/request`,
  STAFF_RECYCLES_ACCEPTED: `${CONFIG.BASE_URL}/staff/recycles/accepted`,
  STAFF_RECYCLES_VERIFIED: `${CONFIG.BASE_URL}/staff/recycles/verified`,
};

export default ENDPOINTS;

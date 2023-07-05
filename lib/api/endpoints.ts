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
  USER_QUESTIONS: `${CONFIG.BASE_URL}/user/questions`,
  USER_QUESTION: (id: number) => `${CONFIG.BASE_URL}/user/questions/${id}`,
  DRIVER_RECYCLES_REQUEST: `${CONFIG.BASE_URL}/driver/recycles/request`,
  DRIVER_RECYCLES_PICKUP: `${CONFIG.BASE_URL}/driver/recycles/pickup`,
  DRIVER_RECYCLES_PICKED: `${CONFIG.BASE_URL}/driver/recycles/picked`,
  DRIVER_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/driver/recycles/${id}`,
  STAFF_RECYCLES: `${CONFIG.BASE_URL}/staff/recycles`,
  STAFF_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/staff/recycles/${id}`,
  STAFF_RECYCLES_REQUEST: `${CONFIG.BASE_URL}/staff/recycles/request`,
  STAFF_RECYCLES_ACCEPTED: `${CONFIG.BASE_URL}/staff/recycles/accepted`,
  STAFF_RECYCLES_VERIFIED: `${CONFIG.BASE_URL}/staff/recycles/verified`,
  STAFF_POINT_WITHDRAWALS: `${CONFIG.BASE_URL}/staff/point-withdrawals`,
  STAFF_POINT_WITHDRAWAL: (id: number) => `${CONFIG.BASE_URL}/staff/point-withdrawals/${id}`,
  STAFF_POINT_WITHDRAWALS_REQUEST: `${CONFIG.BASE_URL}/staff/point-withdrawals/request`,
  STAFF_POINT_WITHDRAWALS_HISTORY: `${CONFIG.BASE_URL}/staff/point-withdrawals/history`,
  STAFF_BALANCE: `${CONFIG.BASE_URL}/staff/balance`,
  STAFF_BALANCE_HISTORIES: `${CONFIG.BASE_URL}/staff/balance/histories`,
};

export default ENDPOINTS;

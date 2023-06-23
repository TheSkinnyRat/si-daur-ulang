import CONFIG from '@lib/api/config';

const ENDPOINTS = {
  SIGNIN: `${CONFIG.BASE_URL}/signin`,
  SIGNUP: `${CONFIG.BASE_URL}/signup`,
  PROFILE: `${CONFIG.BASE_URL}/profile`,
  ADMIN_USERS: `${CONFIG.BASE_URL}/admin/users`,
  ADMIN_USER: (id: number) => `${CONFIG.BASE_URL}/admin/users/${id}`,
  USER_RECYCLES: `${CONFIG.BASE_URL}/user/recycles`,
  USER_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/user/recycles/${id}`,
  DRIVER_RECYCLES_REQUEST: `${CONFIG.BASE_URL}/driver/recycles/request`,
  DRIVER_RECYCLES_PICKUP: `${CONFIG.BASE_URL}/driver/recycles/pickup`,
  DRIVER_RECYCLES_PICKED: `${CONFIG.BASE_URL}/driver/recycles/picked`,
  DRIVER_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/driver/recycles/${id}`,
};

export default ENDPOINTS;

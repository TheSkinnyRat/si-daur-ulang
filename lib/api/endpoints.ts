import CONFIG from '@lib/api/config';

const ENDPOINTS = {
  SIGNIN: `${CONFIG.BASE_URL}/signin`,
  SIGNUP: `${CONFIG.BASE_URL}/signup`,
  PROFILE: `${CONFIG.BASE_URL}/profile`,
  ADMIN_USERS: `${CONFIG.BASE_URL}/admin/users`,
  ADMIN_USER: (id: number) => `${CONFIG.BASE_URL}/admin/users/${id}`,
  USER_RECYCLES: `${CONFIG.BASE_URL}/user/recycles`,
  USER_RECYCLE: (id: number) => `${CONFIG.BASE_URL}/user/recycles/${id}`,
};

export default ENDPOINTS;

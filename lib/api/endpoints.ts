import CONFIG from '@lib/api/config';

const ENDPOINTS = {
  SIGNIN: `${CONFIG.BASE_URL}/signin`,
  SIGNUP: `${CONFIG.BASE_URL}/signup`,
  PROFILE: `${CONFIG.BASE_URL}/profile`,
  ADMIN_USERS: `${CONFIG.BASE_URL}/admin/users`,
  ADMIN_USER: (id: number) => `${CONFIG.BASE_URL}/admin/users/${id}`,
};

export default ENDPOINTS;

import axios from 'axios';
import ENDPOINTS from '@lib/api/endpoints';
import * as I from '@lib/api/interfaces';

export const signIn = async (
  data: I.ISignInData,
) => {
  const response = await axios.post(ENDPOINTS.SIGNIN, data);
  return response.data;
};

export const signUp = async (
  data: I.ISignUpData,
) => {
  const response = await axios.post(ENDPOINTS.SIGNUP, data);
  return response.data;
};

export const getProfile = async (accessToken: string) => {
  const response = await axios.get(ENDPOINTS.PROFILE, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateProfile = async (
  accessToken: string,
  data: I.IUpdateProfileData,
) => {
  const response = await axios.patch(ENDPOINTS.PROFILE, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const adminGetUsers = async (accessToken: string) => {
  const response = await axios.get(ENDPOINTS.ADMIN_USERS, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const adminGetUser = async (accessToken: string, id: number) => {
  const response = await axios.get(ENDPOINTS.ADMIN_USER(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const adminAddUser = async (
  accessToken: string,
  data: I.IAdminAddUserData,
) => {
  const response = await axios.post(ENDPOINTS.ADMIN_USERS, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const adminUpdateUser = async (
  accessToken: string,
  id: number,
  data: I.IAdminUpdateUserData,
) => {
  const response = await axios.patch(ENDPOINTS.ADMIN_USER(id), data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const adminDeleteUser = async (accessToken: string, id: number) => {
  const response = await axios.delete(ENDPOINTS.ADMIN_USER(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const userGetRecycles = async (accessToken: string) => {
  const response = await axios.get(ENDPOINTS.USER_RECYCLES, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const userGetRecycle = async (accessToken: string, id: number) => {
  const response = await axios.get(ENDPOINTS.USER_RECYCLE(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const userAddRecycle = async (
  accessToken: string,
  data: I.IUserAddRecycleData,
) => {
  const response = await axios.post(ENDPOINTS.USER_RECYCLES, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const userDeleteRecycle = async (accessToken: string, id: number) => {
  const response = await axios.delete(ENDPOINTS.USER_RECYCLE(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const driverGetRecyclesRequest = async (accessToken: string) => {
  const response = await axios.get(ENDPOINTS.DRIVER_RECYCLES_REQUEST, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const driverGetRecyclesPickup = async (accessToken: string) => {
  const response = await axios.get(ENDPOINTS.DRIVER_RECYCLES_PICKUP, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const driverGetRecyclesPicked = async (accessToken: string) => {
  const response = await axios.get(ENDPOINTS.DRIVER_RECYCLES_PICKED, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const driverUpdateRecycle = async (
  accessToken: string,
  id: number,
  data: I.IDriverUpdateRecycleData,
) => {
  const response = await axios.patch(ENDPOINTS.DRIVER_RECYCLE(id), data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export * from './interfaces';

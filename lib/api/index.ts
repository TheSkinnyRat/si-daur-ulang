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

export const getUsers = async (accessToken: string) => {
  const response = await axios.get(ENDPOINTS.ADMIN_USERS, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getUser = async (accessToken: string, id: number) => {
  const response = await axios.get(ENDPOINTS.ADMIN_USER(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const addUser = async (
  accessToken: string,
  data: I.IAddUserData,
) => {
  const response = await axios.post(ENDPOINTS.ADMIN_USERS, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const updateUser = async (
  accessToken: string,
  id: number,
  data: I.IUpdateUserData,
) => {
  const response = await axios.patch(ENDPOINTS.ADMIN_USER(id), data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteUser = async (accessToken: string, id: number) => {
  const response = await axios.delete(ENDPOINTS.ADMIN_USER(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export * from './interfaces';

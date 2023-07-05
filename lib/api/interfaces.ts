export interface ISignInData {
  email: string,
  password: string,
}

export interface ISignUpData {
  idCard: string,
  email: string,
  phone: string,
  name: string,
  address: string,
  password: string,
  rePassword: string,
}

export interface IUpdateProfileData {
  idCard?: string,
  email?: string,
  phone?: string,
  name?: string,
  address?: string,
  password?: string,
  rePassword?: string,
}

export interface IAdminAddUserData {
  idCard: string,
  email: string,
  phone: string,
  name: string,
  address: string,
  password: string,
  userRoleId: number,
}

export interface IAdminUpdateUserData {
  idCard?: string,
  email?: string,
  phone?: string,
  name?: string,
  address?: string,
  password?: string,
  userRoleId?: number,
}

export interface IUserAddRecycleData {
  type: string,
  weight: number,
  selfDelivery: number,
}

export interface IUserAddPointWithdrawData {
  amount: number,
  type: string,
  typeValue: string,
}

export interface IUserAddQuestionData {
  question: string,
}

export interface IDriverUpdateRecycleData {
  recycleStatusId: number,
}

export interface IStaffUpdateRecycleData {
  recycleStatusId: number,
  actualType?: string,
  actualWeight?: number,
  actualPoint?: number,
}

export interface IStaffUpdatePointWithdrawalData {
  pointWithdrawalStatusId: number,
  description?: string,
}

export interface IStaffUpdateBalanceData {
  amount: number,
  description?: string,
}

export interface UserModel {
  _id?: string;

  firstName: string;
  lastName: string;
  email: string;

  // You may not have password
  password?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  note: string;
  role: string;
  preferite?: any[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

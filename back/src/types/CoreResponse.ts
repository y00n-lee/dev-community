export interface ICoreResponse {
  status: boolean;
  message?: string;
  err?: string;
}

export interface ICreateUser extends ICoreResponse {
  keyForVerify?: string;
}

export default interface IPasswordRequest {
  email?: string;
  password?: string;
  newPassword?: string;
  isRecover?: boolean;
  characterId?: number;

}

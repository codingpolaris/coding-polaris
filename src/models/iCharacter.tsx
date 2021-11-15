import IUser from "./iUser";

export default interface ICharacter{
    id:number,
    knowledge:number,
    vitality:number,
    level: number,
    experience:number,
    user: IUser,
}

import ICharacter from "./iCharacter";
import IPaths from "./IPaths";

export default interface ICharacterPath{
    id:number,
    isCompleted:boolean,
    character:ICharacter,
    path: IPaths,
}
import ICharacter from "./iCharacter";
import IPaths from "./IPaths";

export default interface ICharacterPath{
    id:number,
    character:ICharacter,
    path: IPaths,
}
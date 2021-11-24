import IContents from "./iContents"
export default interface IChallenge{
    id:number,
    name: string,
    level:number,
    minLevel: number,
    type: string,
    content:IContents,
}
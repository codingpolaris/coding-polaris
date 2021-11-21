import IChallenge from "./iChallenge"
export default interface IAnswer{
    id:number,
    text: string,
    type:string,
    challenge:IChallenge,
}
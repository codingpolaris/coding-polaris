import ITheme from "./IThemes"
export default interface IContents{
    id:number,
    text: string,
    theme:ITheme,
    title:string,
    type:string
}
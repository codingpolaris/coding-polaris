import ICharacter from "./iCharacter";
import ITheme from "./IThemes";

export default interface ICharacterTheme {
  id: number;
  isCompleted: boolean;
  character: ICharacter;
  theme: ITheme;
  themeId: number;
}

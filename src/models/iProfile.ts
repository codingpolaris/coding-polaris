import IAchievement from "./iAchievement";

export default interface IProfile {
  characterId: number;

  username: string;

  email: string;

  full_name: string;

  gender: string;

  class: string;

  achievement: IAchievement[];
}

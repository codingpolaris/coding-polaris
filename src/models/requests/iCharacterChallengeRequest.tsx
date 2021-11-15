export default interface ICharacterChallengeRequest {
  id?: number;
  
  characterId: number;

  ChallengeId: number;

  achievementId: number;

  level?: number;

  accepts?: number;

  fails?: number;

  end_date?: string;

  class?: string;
}

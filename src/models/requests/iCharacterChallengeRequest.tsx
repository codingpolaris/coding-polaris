export default interface ICharacterChallengeRequest {
  id?: number;
  
  characterId: number;

  challengeId: number;

  achievementId: number;

  level?: number;

  accepts?: number;

  fails?: number;

  end_date?: string;

  class?: number;
}

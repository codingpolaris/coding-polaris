import { useHistory, useLocation } from "react-router-dom";
import styles from "./questions.module.scss";
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import logo from "../../assets/Logo.png";
import { Card } from "../../components/card/card";
import IChallenge from "../../models/iChallenge";
import IAnswer from "../../models/iAnswer";
import ICharacterChallengeRequest from "../../models/requests/iCharacterChallengeRequest";
import { useEffect, useState } from "react";
import Api from "../../services/api";
import ICharacterThemeRequest from "../../models/requests/iCharacterThemeRequest";

export function Questions() {
  const history = useHistory();
  const { state } = useLocation<any>();
  const challenges = state.params as IChallenge[];
  const characterId = state.characterId as number;
  const themeId = state.themeId as number;
  const actualTry = state.actualTry as number;

  let request = {} as ICharacterChallengeRequest;
  const [resp, setResp] = useState({} as ICharacterChallengeRequest);
  const [isLast, setIsLast] = useState(challenges.length <= 1);
  const [answers, setAnswers] = useState([] as IAnswer[]);
  const [response, setResponse] = useState({} as IAnswer);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [winStreak, setWinStreak] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  const [challenge, setChallenge] = useState(challenges[0]);
  useEffect(() => {
    if(challenge.id){
      getAnswer(challenge.id);
    }else{
      setIsLast(!isLast);

    }
    getData();
  }, []);

  async function getData() {
    try {
      request.characterId = characterId;
      request.challengeId = challenge.id;
      request.achievementId = 1;
      request.level = challenge.level;
      request.class = themeId;
      const { data } = await Api.post(`characters-challenges/`, request);
      setResp(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAnswer(id: number) {
    try {
      const { data } = await Api.get(`answers/${id}`);
      setAnswers(data.sort(() => Math.random() - 0.5));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function onChangeQuestion() {
    if (challenges.length > 1) {
      setLoading(true);
      challenges.shift();
      setChallenge(challenges[0]);
      await getAnswer(challenges[0].id);
      await getData();
      setConfirm(!confirm);
    }
    else {
      setIsLast(!isLast);
    }
  }

  function formatText(text: string): object[] {
    const stringText = `${text}`;
    let newText = stringText
      .split("\r\n")
      .map((item, i) => <p key={i}>{item}</p>);
    return newText;
  }

  function verifyAnswer() {
    setConfirm(!confirm);

    if (response.type === "correct") {
      setWinStreak(winStreak + 1);
      setWinCount(winCount + 1);
      request.accepts = 1;
    } else {
      setLoseCount(loseCount + 1);
      setWinStreak(0);
      request.fails = 1;
    }
    sendAnswer();
  }

  async function sendAnswer() {
    request.characterId = characterId;
    request.challengeId = challenge.id;
    request.achievementId = 1;
    request.level = challenge.level;
    request.class = themeId;
    request.end_date = new Date().toLocaleDateString();
    try {
      await Api.patch(`characters-challenges/${resp.id}`, request);
    } catch (err) {
      console.log(err);
    }
  }

  async function postTheme() {
    try {
      let request = {} as ICharacterThemeRequest;
      request.characterId = characterId;
      request.themeId = themeId;
      request.isCompleted = true;
      return await Api.patch(`characters-themes/${actualTry}`, request);
    } catch (err) {
      alert("ocorreu algum erro ao salvar");
    }
  }

  async function startNewTheme() {
    try {
      let request = {} as ICharacterThemeRequest;
      request.characterId = characterId;
      request.themeId = themeId + 1;
      request.isCompleted = false;
      await Api.post(`characters-themes/`, request);
      history.goBack();
    } catch (err) {
      alert("ocorreu algum erro ao salvar");
    }
  }

  async function isAproved() {
    if (winCount >= 7) {
      await postTheme();
      startNewTheme();
    } else {
      history.goBack();
    }
  }
  return (
    <div className={styles.container}>
      <Header needBack={true} isLogin={true} characterId={characterId} />
      <img className={styles.logo} src={logo} alt="Logo" />
      <div className={styles.card}>
        {!loading ? (
          <Card>
            {!isLast ? (
              <div>
                <div className={styles.questionTitle}>
                  <p>{formatText(challenge.name.valueOf())}</p>
                </div>
                {winStreak >= 1 ? (
                  <p className={styles.streakText}>Sequencia de acertos: {winStreak}</p>
                ) : null}
                <div className={styles.radioContainer}>
                  {answers.length > 0 ? (
                    <div>
                      {answers.map((answer: IAnswer) => (
                        <div className={styles.radioContainer}>
                          <input
                            className={styles.radio}
                            type="radio"
                            value={answer.type}
                            name="answer"
                            disabled={confirm}
                            onChange={() => setResponse(answer)}
                          />
                          <span
                            className={
                              confirm &&
                              response.text === answer.text &&
                              answer.type === "correct"
                                ? styles.correctAnswer
                                : styles.answer
                            }
                          >
                            {formatText(answer.text)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                {!confirm ? (
                  <Button name={"primary"} onClick={verifyAnswer}>
                    Confirmar
                  </Button>
                ) : (
                  <Button name={"primary"} onClick={onChangeQuestion}>
                    Proxima
                  </Button>
                )}
              </div>
            ) : (
              <div className={styles.respContainer}>
                <p className={styles.respTitle}>Resultado:</p>
                <div className={styles.textArea}>
                  <p className={styles.questionTitle}>
                    Você acertou: {winCount}
                  </p>
                  <p className={styles.questionTitle}>
                    Você errou: {loseCount}
                  </p>
                  {winCount >= 7 ? (
                    <div>
                      <p className={styles.questionTitle}>
                        Parabens! você foi aprovado!
                      </p>
                      <p className={styles.questionTitle}>
                        Clique no botão abaixo para desbloquear seu proximo
                        tema!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className={styles.questionTitle}>
                        Que pena, cheque nossa parte de conteudos e tente
                        novamente!
                      </p>
                      <p className={styles.questionTitle}>
                        Clique no botão abaixo para voltar para a home
                      </p>
                    </div>
                  )}
                </div>
                <Button name={"primary"} onClick={() => isAproved()}>
                  Inicio
                </Button>
              </div>
            )}
          </Card>
        ) : null}
      </div>
    </div>
  );
}

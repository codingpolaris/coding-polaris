import { useHistory, useLocation } from "react-router-dom";
import styles from "./questions.module.scss";
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import logo from "../../assets/Logo.png";
import { Input } from "../../components/input/input";
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
  const [isLast, setIsLast] = useState(challenges.length<=1);
  let count = 1;
  const [answers, setAnswers] = useState([] as IAnswer[]);
  const [response, setResponse] = useState({} as IAnswer);
  const [confirm, setConfirm] = useState(false);
  const  [challenge, setChallenge] = useState(challenges[0]);

  useEffect(() => {
    getAnswer();
    getData();
  }, []);

  async function getData() {
    try {
      request.characterId = characterId;
      request.challengeId = challenge.id;
      request.achievementId = 1;
      request.level = challenge.level;
      request.class =themeId;
      const { data } = await Api.post(`characters-challenges/`, request);
      setResp(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getAnswer() {
    try {
      const { data } = await Api.get(`answers/${challenge.id}`);
      setAnswers(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function onChangeQuestion() {
    if ( count < challenges.length ) {
      setChallenge(challenges[count]);
      count = count+1;
      if (response.type === "correct") {
        challenges.shift();
        count = 0;
      } 
      getAnswer();
      getData();
      setConfirm(!confirm);
    }
    if(challenges.length===1 && count===0){
      setIsLast(!isLast);
      postTheme();
    }

  }

  function verifyAnswer() {
    setConfirm(!confirm);
    if (response.type === "correct") {
      request.accepts = 1;
      alert("Parabéns, você acertou!");
    } else {
      request.fails = 1;
      alert("Infelizmente, você errou! Estude com os conteúdos e tente novamente!");
    }
    sendAnswer();
  }

  async function sendAnswer() {
    request.characterId = characterId;
    request.challengeId = challenge.id;
    request.achievementId = 1;
    request.level = challenge.level;
    request.class =themeId;
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
      request.themeId = themeId+1;
      request.isCompleted = false;
      await Api.post(`characters-themes/`, request);
      history.goBack();
    } catch (err) {
      alert("ocorreu algum erro ao salvar");
    }
  }
  return (
    <div className={styles.container}>
      <Header needBack={true} isLogin={false} characterId={characterId}/>
      <img className={styles.logo} src={logo} alt="Logo" />
      <div className={styles.card}>
        <Card>
          {!isLast ? (
            <div className={styles.cardQuestions}>
              <div className={styles.questionTitle}>
                <a>{challenge.name}</a>
              </div>
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
                          {answer.text}
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
            <div>
              <div className={styles.questionTitle}>
                <a>
                  As questôes deste tema terminaram, volte para o começo e
                  inicie outro tema
                </a>
              </div>
              <Button name={"primary"} onClick={() => startNewTheme()}>
                Inicio
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

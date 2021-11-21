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

export function Questions() {
  const history = useHistory();
  const { state } = useLocation<any>();
  const challenges = state.params as IChallenge[];
  const characterId = state.state as number;
  let request = {} as ICharacterChallengeRequest;
  const [resp, setResp] = useState({} as ICharacterChallengeRequest);
  //let resp = {} as ICharacterChallengeRequest;

  const [answers, setAnswers] = useState([] as IAnswer[]);
  const [response, setResponse] = useState({} as IAnswer);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    async function getAnswer() {
      try {
        const { data } = await Api.get(`answers/${challenge.id}`);
        setAnswers(data);
      } catch (err) {
        alert("ocorreu algum erro");
      }
    }
    async function getData() {
      request.characterId = characterId;
      request.ChallengeId = challenge.id;
      request.achievementId = 1;
      request.level = challenge.level;
      request.class = "Garoto do TI";
      try {
        const { data } = await Api.post(`characters-challenges/`, request);
        setResp(data);
      } catch (err) {
        alert("Eita porra");
      }
    }
    getAnswer();
    getData();
  }, []);

  const challenge = challenges[0];
  async function onChangeQuestion() {
    challenges.shift();
    history.push("/questions", { params: challenges });
    window.location.reload();
  }

  function verifyAnswer() {
    setConfirm(!confirm);
    if (response.type === "correct") {
      request.accepts = 1;
    } else {
      request.fails = 1;
    }
    sendAnswer();
  }

  async function sendAnswer() {
    request.characterId = characterId;
    request.ChallengeId = challenge.id;
    request.achievementId = 1;
    request.level = challenge.level;
    request.class = "Garoto do TI";
    request.end_date = new Date().toLocaleDateString();
    try {
      console.log("resp.id", resp);
      await Api.patch(`characters-challenges/${resp.id}`, request);
    } catch (err) {
      alert("Eita porra");
    }
  }
  return (
    <div className={styles.container}>
      <Header needBack={true} isLogin={true} />
      <img className={styles.logo} src={logo} alt="Logo" />
      <div className={styles.card}>
        <Card>
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
        </Card>
      </div>
    </div>
  );
}

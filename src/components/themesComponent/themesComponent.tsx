import styles from "./themesComponent.module.scss";
import Api from "../../services/api";
import { Button } from "../../components/button/button";
import IThemes from "../../models/IThemes";
import IContents from "../../models/iContents";
import IChallenge from "../../models/iChallenge";
import ICharacterTheme from "../../models/iCharacterTheme";

import ICharacterThemeRequest from "../../models/requests/iCharacterThemeRequest";
import { useEffect, useState } from "react";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow-1.svg";
import { useHistory } from "react-router";

export default function ThemesComponent(props: ICharacterThemeRequest) {
  const history = useHistory();

  const [themes, setThemes] = useState({} as IThemes[]);

  let theme = [] as IThemes[];
  let contents = [] as IContents[];
  let challenges = [] as IChallenge[];
  const [register, setRegister] = useState([] as ICharacterTheme[]);
  const [actualChallenge, setActualChallenge] = useState(0);

  useEffect(() => {
    async function getTheme() {
      try {
        const { data } = await Api.get(`theme-paths/${props.pathId}`);
        data.forEach((themes: any) => {
          theme.push(themes.theme);
        });

        setThemes(theme);
      } catch (err) {
        alert("ocorreu algum erro theme");
      }
    }
    getTheme();
    getHistory();
  }, []);

  async function getContent(id: number) {
    try {
      const { data } = await Api.get(`contents/${id}`);
      contents = data;
      history.push("/contents", { params: contents });
    } catch (err) {
      alert("ocorreu algum erro content");
    }
  }

  async function getChallenges(id: number) {
    try {
      const { data } = await Api.get(`challenges/${id}/${props.characterId}`);
      const actualTry = register.find((history) => history.id === id);
      history.push("/questions", {
        params: data.sort(() => Math.random() - 0.5),
        characterId: props.characterId,
        themeId: id,
        actualTry: actualTry?.id,
      });
    } catch (err) {
      alert("ocorreu algum erro questions");
    }
  }

  async function getHistory() {
    try {
      const { data } = await Api.get(
        `characters-themes/${props.characterId}/${props.pathId}`
      );
      setRegister(data);
      if (data.length <= 0) {
        postTheme(theme[0].id);
        getHistory();
      }
    } catch (err) {
      alert("ocorreu algum erro ao salvar");
    }
  }

  async function postTheme(themeId: number) {
    try {
      let request = {} as ICharacterThemeRequest;
      request.characterId = props.characterId;
      request.themeId = themeId;
      request.isCompleted = false;
      await Api.post("characters-themes", request);
    } catch (err) {
      alert("ocorreu algum erro ao salvar");
    }
  }

  function verifyTheme(themeId: number): boolean {
    let isDisabled = true;
    register.forEach((history) => {
      if (history.id === themeId) {
        isDisabled = history.isCompleted;
      }
    });
    return isDisabled;
  }

  return (
    <div>
      {themes.length > 0 ? (
        <div className={styles.container}>
          <p className={styles.secondaryText}>Siga sua trilha</p>
          {themes.map((theme: IThemes) => (
            <div className={styles.buttonArea}>
              <div className={styles.themeButton}>
                <Button
                  name={"primary"}
                  onClick={() => getContent(theme.id)}
                  disabled={verifyTheme(theme.id)}
                >
                  {" "}
                  Conteúdo
                </Button>
                <Button name={"primary"} disabled={verifyTheme(theme.id)}>
                  {theme.name}
                </Button>
                <Button
                  disabled={verifyTheme(theme.id)}
                  name={"primary"}
                  onClick={() => getChallenges(theme.id)}
                >
                  Atividade
                </Button>
              </div>
              <Arrow />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

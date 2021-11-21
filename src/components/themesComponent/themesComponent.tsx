import styles from "./themesComponent.module.scss";
import Api from "../../services/api";
import { Button } from "../../components/button/button";
import IThemes from "../../models/IThemes";
import IContents from "../../models/iContents";
import IChallenge from "../../models/iChallenge";

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

  useEffect(() => {
    async function getTheme() {
      try {
        const { data } = await Api.get(`theme-paths/${props.themeId}`);
        data.forEach((themes: any) => {
          theme.push(themes.theme);
        });

        setThemes(theme);
      } catch (err) {
        alert("ocorreu algum erro");
      }
    }
    getTheme();
  }, []);

  async function getContent(id: number) {
    try {
      const { data } = await Api.get(`contents/${id}`);
      contents = data;
      history.push("/contents", { params: contents });
    } catch (err) {
      alert("ocorreu algum erro");
    }
  }

  async function getChallenges(id: number) {
    try {
      const { data } = await Api.get(`challenges/${id}/${ props.characterId }`);
      challenges = data;
      history.push("/questions", { params: challenges, state: props.characterId });
    } catch (err) {
      alert("ocorreu algum erro");
    }
  }

  async function postTheme(themeId: number) {
    try {
      let request = {} as ICharacterThemeRequest;
      request.characterId = props.characterId;
      request.themeId = themeId;
      await Api.post("character-theme", request);
    } catch (err) {
      alert("ocorreu algum erro ao salvar");
    }
  }

  return (
    <div>
      {themes.length > 0 ? (
        <div className={styles.container}>
          <p className={styles.secondaryText}>Siga sua trilha</p>
          {themes.map((theme: IThemes) => (
            <div className={styles.buttonArea}>
              <div className={styles.themeButton}>
                <Button name={"primary"} onClick={() => getContent(theme.id)}>
                  Conteúdo
                </Button>
                <Button name={"primary"} onClick={() => postTheme(theme.id)}>
                  {theme.name}
                </Button>
                <Button
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

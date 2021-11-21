import { useHistory, useLocation } from "react-router-dom";
import styles from "./home.module.scss";
import Api from "../../services/api";
import { Header } from "../../components/header/header";
import IUser from "../../models/iUser";
import IProfile from "../../models/iProfile";
import ICharacterPath from "../../models/iCharacterPath";
import { useEffect, useState } from "react";
import PathsComponent from "../../components/pathsComponent/pathsComponent";
import ThemesComponent from "../../components/themesComponent/themesComponent";
import ICharacterPathRequest from "../../models/requests/iCharacterPathRequest";

export function Home() {
  const { state } = useLocation<any>();
  const characterId = state.params as number;
  const [character, setCharacter] = useState({} as IProfile);
  const [characterPath, setCharacterPath] = useState({} as ICharacterPath[]);
  const [noob, setNoob] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCharacter() {
      try {
        const { data } = await Api.get(`profile/${characterId}`);
        setCharacter(data);
        getCharacterPath(characterId);
      } catch (err) {
        alert("ocorreu algum erro no personagem");
      }
    }
    async function getCharacterPath(id: number) {
      try {
        const { data } = await Api.get(`characters-paths/${id}`);
        setCharacterPath(data);
        setNoob(!noob);
        setLoading(!loading);
        if (data.length <= 0) {
          const register = {} as ICharacterPathRequest;
          register.characterId = characterId;
          register.pathId = 1;
          Api.post("characters-paths/", register);
          getCharacterPath(id);
        }
      } catch (err) {
        alert("ocorreu algum erro nos paths");
      }
    }
    getCharacter();
  }, []);

  return (
    <div className={styles.container}>
      <Header isLogin={true} selected={"Content"} characterId={characterId}/>
      {loading ? (
        <div className={styles.textArea}>
          <span className={styles.welcomeText}>
            {" "}
            {character.gender === "male"
              ? "Seja bem-vindo "
              : "Seja bem-vinda "}
            <span className={styles.name}>{character.full_name}</span>
          </span>
          {noob ? (
            <div>
              {characterPath.length <= 0 ? (
                <div className={styles.textArea}>
                  <span className={styles.primaryText}>
                    Agora chegou sua vez de se aprofundar em uma
                    <span className={styles.stack}> stack</span>
                  </span>
                  <PathsComponent />
                </div>
              ) : (
                <ThemesComponent
                  pathId={characterPath[0].path.id}
                  characterId={character.characterId}
                />
              )}
            </div>
          ) : null}

          <p className={styles.secondaryText}>
            Seu caminho para se tornar uma desenvolvedora começa aqui
          </p>
        </div>
      ) : null}
    </div>
  );
}

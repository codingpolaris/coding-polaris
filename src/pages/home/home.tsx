import { useHistory, useLocation } from "react-router-dom";
import styles from "./home.module.scss";
import Api from "../../services/api";
import { Header } from "../../components/header/header";
import IUser from "../../models/iUser";
import ICharacter from "../../models/iCharacter";
import ICharacterPath from "../../models/iCharacterPath";
import { useEffect, useState } from "react";
import PathsComponent from "../../components/pathsComponent/pathsComponent";
import ThemesComponent from "../../components/themesComponent/themesComponent";
import ICharacterPathRequest from "../../models/requests/iCharacterPathRequest";

export function Home() {
  const { state } = useLocation<any>();
  const user = state.params as IUser;
  const [character, setCharacter] = useState({} as ICharacter);
  const [characterPath, setCharacterPath] = useState({} as ICharacterPath[]);
  const [noob, setNoob] = useState(false);

  useEffect(() => {
    async function getCharacter() {
      try {
        await Api.get(`characters/${user.id}`).then((resp) => {
          setCharacter(resp.data);
          Api.get(`characters-paths/${resp.data.id}`).then((resp) => {
            setCharacterPath(resp.data);
            setNoob(!noob);
            if (resp.data.length <= 0) {
              const register = {} as ICharacterPathRequest;
              register.characterId = character.id;
              register.pathId = 1;
              Api.post("characters-paths/", register);
            }
          });
        });
      } catch (err) {
        alert("ocorreu algum erro no personagem");
      }
    }

    getCharacter();
  }, []);

  return (
    <div className={styles.container}>
      <Header isLogin={true} selected={"Content"} />
      <div className={styles.textArea}>
        <span className={styles.welcomeText}>
          {" "}
          {user.gender === "male" ? "Seja bem-vindo " : "Seja bem-vinda "}
          <span className={styles.name}>{user.full_name}</span>
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
            ) : <ThemesComponent themeId={characterPath[0].path.id} characterId={character.id}/>}
          </div>
        ) : null}

        <p className={styles.secondaryText}>
          Seu caminho para se tornar uma desenvolvedora começa aqui
        </p>
      </div>
    </div>
  );
}

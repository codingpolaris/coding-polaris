import styles from "./profile.module.scss";
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import logo from "../../assets/Logo.png";
import { Card } from "../../components/card/card";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import IProfile from "../../models/iProfile";
import Api from "../../services/api";

export function Profile() {
  const { state } = useLocation<any>();
  const characterId = state.params as number;
  const [character, setCharacter] = useState({} as IProfile);

  useEffect(() => {
    async function getCharacter() {
      try {
        const { data } = await Api.get(`profile/${characterId}`);
        setCharacter(data);
      } catch (err) {
        alert("ocorreu algum erro no personagem");
      }
    }
    getCharacter();
  }, []);
  return (
    <div className={styles.container}>
      <Header isLogin={true} selected={"Profile"} characterId={characterId} />
      {character ? (
        <div>
          <div className={styles.profileArea}>
            <Card>
              <div className={styles.photoArea}>
                <div className={styles.photo}></div>
                <div className={styles.userProfile}>
                  <a>{character.username}</a>
                  <a>{character.full_name}</a>
                  <a>{character.class}</a>
                </div>
              </div>
            </Card>
          </div>
          <div className={styles.achievementArea}>
            <div>
              <a>Insígnas</a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

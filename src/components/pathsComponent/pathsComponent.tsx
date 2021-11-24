import styles from "./pathsComponent.module.scss";
import Api from "../../services/api";
import { Button } from "../../components/button/button";
import IPaths from "../../models/IPaths";
import { useEffect, useState } from "react";
import ICharacterPathRequest from "../../models/requests/iCharacterPathRequest";
import { useHistory } from "react-router";

export default function PathsComponent(props: ICharacterPathRequest) {
  const [paths, setPaths] = useState({} as IPaths[]);
  const history = useHistory();

  useEffect(() => {
    async function getPath() {
      try {
        const { data } = await Api.get("paths");
        setPaths(data);
      } catch (err) {
        alert("ocorreu algum erro");
      }
    }
    getPath();
  }, []);

  async function setCharacterPath(id: number) {
    try {
      const register = {} as ICharacterPathRequest;
      register.characterId = props.characterId;
      register.pathId = id;
      await Api.post("characters-paths/", register);
      history.push("/home", { params: props.characterId });
    } catch (err) {
      alert("ocorreu algum erro nos paths");
    }
  }

  function verifyPath(path: IPaths): boolean {
    let isDisabled = true;
    if (path.access < 5) {
      isDisabled = false;
    }

    return isDisabled;
  }
  return (
    <div>
      {paths.length > 0 ? (
        <div className={styles.container}>
          <p className={styles.secondaryText}>Escolha sua trilha</p>
          <div className={styles.buttonArea}>
            {paths.map((path: IPaths) => (
              <div>
                {path.access >= 1 ? (
                  <Button
                    name={"primary"}
                    onClick={() => setCharacterPath(path.id)}
                    disabled={verifyPath(path)}
                  >
                    {path.name}
                  </Button>
                ) : null}
                {path.access >= 5 ? (
                  <p className={styles.comingSoonText}>Em breve</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

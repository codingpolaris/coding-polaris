import styles from "./pathsComponent.module.scss";
import Api from "../../services/api";
import { Button } from "../../components/button/button";
import IPaths from "../../models/IPaths";
import { useEffect, useState } from "react";

export default function PathsComponent() {
  const [paths, setPaths] = useState({} as IPaths[]);

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

  return (
    <div>
      {paths.length > 0 ? (
        <div className={styles.container}>
          <p className={styles.secondaryText}>Escolha sua trilha</p>
          <div className={styles.buttonArea}>
            {paths.map((path: IPaths) => (
              <div>
                {path.acess >= 1 ? (
                  <Button name={"primary"}>{path.name}</Button>
                ) : null}
                {path.acess >= 5 ? (
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

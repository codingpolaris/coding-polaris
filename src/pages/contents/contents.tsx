import { useHistory, useLocation } from "react-router-dom";
import styles from "./contents.module.scss";
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import logo from "../../assets/Logo.png";
import { Input } from "../../components/input/input";
import { Card } from "../../components/card/card";
import { ReactComponent as UploadIcon } from "../../assets/icons/Upload.svg";
import IContents from "../../models/iContents";

export function Contents() {
  const { state } = useLocation<any>();
  const contents = state.params as IContents[];
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card>
          <div className={styles.contentsTitle}>
            <a>Conteúdos Relacionados</a>
          </div>
          {contents.length > 0 ? (
            <div>
              {contents.map((content: IContents) => (
                <div className={styles.contents}>
                  <a>{content.title}</a>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

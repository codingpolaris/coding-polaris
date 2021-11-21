import { useHistory, useLocation } from "react-router-dom";
import styles from "./configuration.module.scss";
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { ReactComponent as UploadIcon } from "../../assets/icons/Upload.svg";

export function Configuration() {
  const history = useHistory();
  const { state } = useLocation<any>();
  const characterId = state.params as number;
  async function genderOptions() {
    history.push("/genderOptions", { params: characterId });
  }

  async function newPassword() {
    history.push("/newPassword", { params: characterId });
  }

  async function logOut() {
    //const teste = await Api.get('');
    history.push("/");
  }

  return (
    <div className={styles.container}>
      <Header
        isLogin={true}
        selected={"Configuration"}
        characterId={characterId}
      />
      <div className={styles.buttonArea}>
        <Card>
          <div className={styles.photoArea}>
            <div className={styles.photo}></div>
            <UploadIcon className={styles.uploadButton}></UploadIcon>
          </div>
          <Button name={"secundary"} onClick={newPassword}>
            Mudar senha
          </Button>
          <Button name={"secundary"} onClick={genderOptions}>
            Modificar gênero
          </Button>
          <Button name={"secundary"} onClick={logOut}>
            Desconectar conta
          </Button>
        </Card>
      </div>
    </div>
  );
}

import { useHistory } from "react-router-dom";
import styles from "./passwordReset.module.scss";
import { Button } from "../../components/button/button";
import logo from "../../assets/Logo.png";
import { Input } from "../../components/input/input";
import Api from "../../services/api";
import IPasswordRequest from "../../models/requests/iPasswordRequest";
export function PasswordReset() {
  const history = useHistory();
  const newPasword: IPasswordRequest = {} as IPasswordRequest;

  async function sendEmail() {
    try {
      await Api.post("users/passwordReset", newPasword);
      alert("Um email contendo uma nova senha foi enviado para o seu email");
      history.push("login");
    } catch (err) {
      alert("Ocorreu algum problema");
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.inputArea}>
          <Input
            type="text"
            placeholder="Email"
            onChange={(event) => (newPasword.email = event.target.value)}
          />
        </div>
        <div className={styles.buttonArea}>
          <Button name={"primary"} onClick={sendEmail}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}

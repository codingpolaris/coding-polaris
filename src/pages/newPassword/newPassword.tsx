import { useHistory, useLocation } from "react-router-dom";
import styles from "./newPassword.module.scss";
import { Button } from "../../components/button/button";
import logo from "../../assets/Logo.png";
import { Input } from "../../components/input/input";
import { Header } from "../../components/header/header";
import IPasswordRequest from "../../models/requests/iPasswordRequest";
import Api from "../../services/api";

export function NewPassword() {
  const history = useHistory();
  const { state } = useLocation<any>();
  const characterId = state.params as number;
  const newPasword: IPasswordRequest = {} as IPasswordRequest;
  let confirmPassword: string;

  async function sendNewPassword() {
    try {
      if (confirmPassword === newPasword.newPassword) {
        newPasword.isRecover = false;
        newPasword.characterId = characterId;
        await Api.post("users/passwordReset", newPasword);
        history.goBack();
      } else {
        alert("Senhas estão diferentes");
      }
    } catch (err) {
      alert("Ocorreu algum problema");
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <Header needBack={true} isLogin={true} characterId={characterId} />
      <div className={styles.logoArea}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.inputArea}>
          <Input
            isPassword={true}
            minLength={8}
            maxLength={15}
            placeholder="Senha anterior"
            onChange={(event) => (newPasword.password = event.target.value)}
          />
          <Input
            isPassword={true}
            minLength={8}
            maxLength={15}
            placeholder="Nova senha"
            onChange={(event) => (newPasword.newPassword = event.target.value)}
          />
          <p className={styles.passwordText}>Pelo menos 8 caracteres</p>
          <Input
            isPassword={true}
            minLength={8}
            maxLength={15}
            placeholder="Confirme a senha"
            onChange={(event) => (confirmPassword = event.target.value)}
          />
          <Button name={"primary"} onClick={() => sendNewPassword()}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}

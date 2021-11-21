import { useHistory } from "react-router-dom";
import styles from "./login.module.scss";
import Api from "../../services/api";
import logo from "../../assets/Logo.png";
import google from "../../assets/Google.png";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import ILogin from "../../models/Ilogin";
import IUser from "../../models/iUser";
import ICharacter from "../../models/iCharacter";
import { Header } from "../../components/header/header";

export function Login() {
  const history = useHistory();
  const login: ILogin = {} as ILogin;

  async function signIn() {
    try {
      const { data } = await Api.post("auth/login", login);
      getUser(data.access_token);
    } catch (e) {
      alert("Login failed");
    }
  }
  async function getUser(token: string) {
    try {
      const { data } = await Api.get("data", {
        headers: { Authorization: `bearer ${token}` },
      });
      const user: IUser = data;
      const character: ICharacter = await (await Api.get(`characters/${user.id}`)).data
      console.log(character);
      history.push("/home", { params: character.id });
    } catch (e) {
      alert("Get user failed");
    }
  }
  return (
    <div className={styles.container}>
      <Header needBack={true} isLogin={false} />
      <img className={styles.logo} src={logo} alt="Logo" />
      <div className={styles.inputArea}>
        <Input
          type="text"
          placeholder="Usuario"
          onChange={(event) => (login.username = event.target.value)}
        />
        <Input
          isPassword={true}
          placeholder="Senha"
          minLength={8}
          maxLength={15}
          onChange={(event) => (login.password = event.target.value)}
        />
        <Button name={"primary"} onClick={signIn}>
          Login
        </Button>
      </div>
      <a className={styles.text} href="/passwordReset">
        Esqueci minha senha
      </a>
    </div>
  );
}

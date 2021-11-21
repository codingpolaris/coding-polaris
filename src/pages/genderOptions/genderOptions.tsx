import { useHistory, useLocation } from "react-router-dom";
import styles from "./genderOptions.module.scss";
import Api from "../../services/api";
import logo from "../../assets/Logo.png";
import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { useState } from "react";
import IUser from "../../models/iUser";

export function GenderOptions() {
  const history = useHistory();
  const { state } = useLocation<any>();
  const characterId = state.params as number;
  const user: IUser = {} as IUser;

  async function changeGender() {
    try {
      await Api.post(`gender/${characterId}`, user);
      history.goBack();
    } catch (err) {
      alert("Ocorreu algum problema");
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <Header
        needBack={true}
        isLogin={true}
        selected={"Configuration"}
        characterId={characterId}
      />
      <img className={styles.logo} src={logo} alt="Logo" />
      <div className={styles.genderButtons}>
        <select
          className={styles.genderOptions}
          name="sexo"
          id="sexo"
          onChange={(event) => (user.gender = event.target.value)}
        >
          <option hidden>Como devemos te tratar?</option>
          <option value="feminino">Quero ser tratada no feminino</option>
          <option value="masculino">Quero ser tratado no masculino</option>
        </select>
      </div>
      <Button
        className={styles.sendButton}
        name={"primary"}
        onClick={changeGender}
      >
        Enviar
      </Button>
    </div>
  );
}

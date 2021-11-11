import { useHistory } from 'react-router-dom';
import styles from './genderOptions.module.scss';
import Api from '../../services/api'
import logo from '../../assets/Logo.png';
import { Button } from '../../components/button/button';
import { Header } from '../../components/header/header';
import { useState } from 'react';

export function GenderOptions() {
    const history = useHistory();

    const [ active, setActive ] = useState(true)

    async function changeGender() {
      //const teste = await Api.get('');
      history.push('/configuration');
    }

    function isSelected() {
        setActive(!active)
    }
    
    return (
      <div className={styles.container}>
        <Header needBack={true} isLogin={true} selected={'Configuration'} />
        <img  className={styles.logo} src={logo} alt="Logo"/>
        <div className={styles.genderButtons}>
            <Button name={'secondary'} onClick={isSelected} disabled={active}>
            Quero ser tratada no feminino
            </Button>
            <Button name={'secondary'} onClick={isSelected} disabled={!active}>
            Quero ser tratado no masculino
            </Button>
        </div>
        <Button className={styles.sendButton} name={'primary'} onClick={changeGender}>
          Enviar
        </Button>
      </div>
    );
}
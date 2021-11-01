import { useHistory } from 'react-router-dom';
import styles from './home.module.scss';
import Api from '../../services/api';
import { Button } from '../../components/button/button';
import { Header } from '../../components/header/header';
import { ReactComponent as Arrow } from '../../assets/icons/Arrow 1.svg';

export function Home() {
  return (
    <div className={styles.container}>
      <Header isLogin={true} selected={'Content'} />
      <div className={styles.textArea}>
        <span className={styles.welcomeText}>
          Seja bem-vinda <span className={styles.name}>Alexa</span>
        </span>
        <p className={styles.secondaryText}>
          Seu caminho para se tornar uma desenvolvedora começa aqui
        </p>
      </div>
      <div className={styles.buttonArea}>
        <Button name={'primary'}>Lógica de Programação</Button>
        <Arrow/>
        <Button name={'primary'}>Git</Button>
        <Arrow/>
      </div>
      <p className={styles.endText}>Parabéns por chegar até aqui!</p>
    </div>
  );
}

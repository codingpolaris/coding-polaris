import { useHistory } from 'react-router-dom';
import styles from './path.module.scss';
import Api from '../../services/api';
import { Button } from '../../components/button/button';
import { Header } from '../../components/header/header';

export function Path() {
  return (
    <div className={styles.container}>
      <Header isLogin={true} selected={'Content'} />
      <div className={styles.textArea}>
        <span className={styles.primaryText}>
          Agora chegou sua vez de se aprofundar em uma
          <span className={styles.stack}> stack</span>
        </span>
        <p className={styles.secondaryText}>Escolha sua trilha</p>
      </div>
      <div className={styles.buttonArea}>
        <Button name={'primary'}>Front-End</Button>
        <div>
          <Button name={'primary'}>Back-End</Button>
          <p className={styles.comingSoonText}>Em breve</p>
        </div>
        <div>
          <Button name={'primary'}>Mobile</Button>
          <p className={styles.comingSoonText}>Em breve</p>
        </div>
      </div>
    </div>
  );
}

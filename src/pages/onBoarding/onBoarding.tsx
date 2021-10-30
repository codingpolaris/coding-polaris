import { useHistory } from 'react-router-dom';
import styles from './onBoarding.module.scss';
import Api from '../../services/api';
import logo from '../../assets/Logo.png';
import mary from '../../assets/Mary.png';
import { Button } from '../../components/button/button';

export function OnBoarding() {
  const history = useHistory();

    function login() {
    history.push('login');
  }
  function register() {
    history.push('signup');
  }


  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <img className={styles.logo} src={logo} alt='Logo' />
        <div className={styles.buttonArea}>
          <Button name={'secondary'} onClick={register}>
            Cadastrar
          </Button>
          <Button name={'primary'} onClick={login}>
            Login
          </Button>
        </div>
        <strong className={styles.text}>Aprenda a programar jogando! </strong>
      </div>
      <div className={styles.lowerContainer}>
        <img className={styles.mary} src={mary} alt='Imagem da mascote Mary' />
      </div>
    </div>
  );
}

import { useHistory } from 'react-router-dom';
import styles from './passwordReset.module.scss';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';

export function PasswordReset() {
    const history = useHistory();

    function sendEmail() {
    history.push('login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <img className={styles.logo} src={logo} alt='Logo' />
        <div className={styles.buttonArea}>
          <Button name={'buttonReset'} onClick={sendEmail}>
            Enviar
          </Button>
        </div>
        <strong className={styles.text}>Aprenda a programar jogando! </strong>
      </div>
    </div>
  );
}
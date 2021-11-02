import { useHistory } from 'react-router-dom';
import styles from './passwordReset.module.scss';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Input } from '../../components/input/input';

export function PasswordReset() {
    const history = useHistory();

    function sendEmail() {
    history.push('login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <img className={styles.logo} src={logo} alt='Logo' />
        <div className={styles.inputArea}>
          <Input type='text' placeholder='Email' />
        </div>
        <div className={styles.buttonArea}>
          <Button name={'primary'} onClick={sendEmail}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
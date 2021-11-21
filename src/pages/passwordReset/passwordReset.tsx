import { useHistory } from 'react-router-dom';
import styles from './passwordReset.module.scss';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Input } from '../../components/input/input';
import { Header } from '../../components/header/header';

export function PasswordReset() {
    const history = useHistory();

  function sendEmail() {
    history.push('login');
  }

  return (
    <div className={styles.container}>
      <Header needBack={true} isLogin={false}/>
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
  );
}
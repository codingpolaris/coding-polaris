import { useHistory } from 'react-router-dom';
import styles from './newPassword.module.scss';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Input } from '../../components/input/input';

export function NewPassword() {
    const history = useHistory();

    function sendNewPassword() {     
        history.push('login');
    }

    return (
        <div className={styles.container}>
        <div className={styles.upperContainer}>
          <img className={styles.logo} src={logo} alt='Logo' />
          <div className={styles.inputArea}> 
            <Input type='password' minLength={8} maxLength={15} placeholder='Senha anterior' />
            <Input type='password' minLength={8} maxLength={15} placeholder='Nova senha' />
            <p className={styles.passwordText}>Pelo menos 8 caracteres</p>
            <Input type='password' minLength={8} maxLength={15} placeholder='Confirme a senha' />
            <Button name={'primary'} >Enviar</Button>
          </div>
        </div>
      </div>
    );
}
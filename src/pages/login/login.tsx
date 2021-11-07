import { useHistory } from 'react-router-dom';
import styles from './login.module.scss';
import Api from '../../services/api'
import logo from '../../assets/Logo.png';
import google from '../../assets/Google.png';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

export function Login() {
    const history = useHistory();
    async function signIn() {
      //const teste = await Api.get('');
      history.push('/home');
    }
    
    return (
      <div className={styles.container}>
        <img  className={styles.logo} src={logo} alt="Logo"/>
        <div className={styles.inputArea}>
        <Input type='text' placeholder='Usuario' />
        <Input type='password' placeholder='Senha' minLength={8} maxLength={15}/>
        <Button name={'primary'} onClick={signIn}>Login</Button>
        </div>
        <a className={styles.text} href='/passwordReset'>
          Esqueci minha senha
        </a>
        <img className={styles.google} src={google} alt="Icone Google"/>
      </div>
    );
  }
  
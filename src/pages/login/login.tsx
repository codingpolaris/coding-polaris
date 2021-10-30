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
      const teste = await Api.get('');
      console.log(teste);
      history.push('');
    }
    
    return (
      <div className={styles.container}>
        <img  className={styles.logo} src={logo} alt="Logo"/>
        <div className={styles.inputArea}>
        <Input type='text' placeholder='Usuario' />
        <Input type='password' placeholder='Senha' />
        <Button name={'primary'} onClick={signIn}>Login</Button>
        </div>
        <a className={styles.text} href='./'>
          Esqueci minha senha
        </a>
        <img className={styles.google} src={google} alt="Icone Google"/>
      </div>
    );
  }
  
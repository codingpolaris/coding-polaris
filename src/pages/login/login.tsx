import { useHistory } from 'react-router-dom';
import styles from './login.module.scss';
import Api from '../../services/api'
import logo from '../../assets/Logo.png';
import google from '../../assets/Google.png';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import ILogin from '../../models/Ilogin'
import { Header } from '../../components/header/header';

export function Login() {
    const history = useHistory();
    const user: ILogin = {} as ILogin;
    async function signIn() {
      const teste = await Api.post('auth/login', user);
      console.log(teste);
      history.push('/home');
    }
    
    return (
      <div className={styles.container}>
        <Header needBack={true} isLogin={false} />
        <img className={styles.logo} src={logo} alt="Logo"/>
        <div className={styles.inputArea}>
        <Input type='text' placeholder='Usuario' onChange={event => user.username = event.target.value}/>
        <Input type='password' placeholder='Senha' minLength={8} maxLength={15} onChange={event => user.password = event.target.value}/>
        <Button id={ "seila" } name={'primary'} onClick={signIn}>Login</Button>
        </div>
        <a className={styles.text} href='/passwordReset'>
          Esqueci minha senha
        </a>
      </div>
    );
  }
  
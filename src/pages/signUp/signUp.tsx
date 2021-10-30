import { useHistory } from 'react-router-dom';
import styles from './signUp.module.scss';
import Api from '../../services/api';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Header } from '../../components/header/header';
export function SignUp() {
  const history = useHistory();
  async function signIn() {
    const teste = await Api.get('');
    console.log(teste);
    history.push('');
  }
  let bool: boolean = false;
  return (
    <div className={styles.container}>
      <Header isLogin={bool} />
      <div className={styles.inputArea}>
        <strong className={styles.text}>Cadastro</strong>
        <Input type='text' placeholder='Usuario' />
        <Input type='password' placeholder='Nome' />
        <Input type='text' placeholder='Email' />
        <Input type='password' placeholder='Senha' />
        <p className={styles.passwordText}>Pelo menos 8 caracteres</p>
        <Input type='password' placeholder='Como você deseja ser tratado?' />
        <Button name={'primary'} onClick={signIn}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
}

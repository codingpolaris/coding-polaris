import { useHistory } from 'react-router-dom';
import styles from './signUp.module.scss';
import Api from '../../services/api';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Header } from '../../components/header/header';
import ISignUp from '../../models/Isignup';
export function SignUp() {
  const history = useHistory();
  const user: ISignUp = {} as ISignUp;

  async function signIn() {
    const teste = await Api.post('users', user);
    console.log("o caraljo", user);
    //history.push('');
  }

  return (
    <div className={styles.container}>
      <Header needBack={true} isLogin={false} />
      <div className={styles.inputArea}>
        <strong className={styles.text}>Cadastro</strong>
        <Input type='text' placeholder='Usuario' onChange={event => user.username = event.target.value}/>
        <Input type='text' placeholder='Nome' onChange={event => user.full_name = event.target.value}/>
        <Input type='text' placeholder='Email' onChange={event => user.email = event.target.value}/>
        <Input type='password' placeholder='Senha' minLength={8} maxLength={15} onChange={event => user.password = event.target.value}/>
        <p className={styles.passwordText}>A senha deve conter pelo menos 8 caracteres</p>
        <select className={styles.genderOptions} name='sexo' id='sexo' onChange={event => user.gender = event.target.value}>
            <option hidden>Como devemos te tratar?</option>
            <option value='feminino'>Quero ser tratada no feminino</option>
            <option value='masculino'>Quero ser tratado no masculino</option>
        </select>      
        <Button name={'primary'} onClick={signIn}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
}


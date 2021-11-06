import { useHistory } from 'react-router-dom';
import styles from './configuration.module.scss';
import { Header } from '../../components/header/header';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Input } from '../../components/input/input';

export function Configuration() {
    return (
        <div className={styles.container}>     
          <Header isLogin={true} selected={'Configuration'} />
            <div className={styles.buttonArea}>          
                <Button name={'secundary'}>Alterar nome</Button>
                <Button name={'secundary'}>Mudar senha</Button>
                <Button name={'secundary'}>Modificar gênero</Button>
            </div>
        </div>
    );
}
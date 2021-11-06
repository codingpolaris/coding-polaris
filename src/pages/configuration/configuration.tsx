import { useHistory } from 'react-router-dom';
import styles from './configuration.module.scss';
import { Header } from '../../components/header/header';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Input } from '../../components/input/input';
import { Card } from '../../components/card/card';
import { ReactComponent as UploadIcon } from '../../assets/icons/Upload.svg';

export function Configuration() {
    return (
        <div className={styles.container}>     
          <Header isLogin={true} selected={'Configuration'} />
            <div className={styles.buttonArea}>  
                <Card> 
                    <div className={styles.photoArea}>          
                        <div className={styles.photo}></div>
                        <UploadIcon className={styles.uploadButton}></UploadIcon>
                    </div>
                    <Button name={'secundary'}>Alterar nome</Button>
                    <Button name={'secundary'}>Mudar senha</Button>
                    <Button name={'secundary'}>Modificar gênero</Button>
                </Card>        
            </div>
        </div>
    );
}
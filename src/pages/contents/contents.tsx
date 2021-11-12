import { useHistory } from 'react-router-dom';
import styles from './contents.module.scss';
import { Header } from '../../components/header/header';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Input } from '../../components/input/input';
import { Card } from '../../components/card/card';
import { ReactComponent as UploadIcon } from '../../assets/icons/Upload.svg';


export function Contents() {
    return (
        <div className={styles.container}> 
            <div className={styles.card}>
            <Card>
                <div className={styles.contentsTitle}>
                    <a>Conteúdos Relacionados</a>
                </div>
                <div className={styles.contents}>
                    <a>O que é algoritmo? [voitto.com]</a>
                    <a>Algoritmos [blog.pantuza]</a>
                </div>
            </Card>
            </div>       
        </div>
    );
}
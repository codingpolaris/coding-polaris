import { useHistory } from 'react-router-dom';
import styles from './questions.module.scss';
import { Header } from '../../components/header/header';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Input } from '../../components/input/input';
import { Card } from '../../components/card/card';

export function Questions() {
    async function onChangeAnswer() {
        console.log("teste");
        //history.push('/home');
      }

    return (
        <div className={styles.container}> 
        <Header needBack={true} isLogin={true} />
        <img className={styles.logo} src={logo} alt="Logo"/>
            <div className={styles.card}>
            <Card>
                <div className={styles.questionTitle}>
                    <a>O que é algoritmo?</a>
                </div>
                <div className={styles.radioContainer} onChange={onChangeAnswer}>
                    <input type="radio" value="Male" name="gender" /> 
                    <a> Male </a>
                    <input type="radio" value="Female" name="gender" /> 
                    <a> Male </a>
                    <input type="radio" value="Other" name="gender" /> 
                    <a> Male </a>
                    <input type="radio" value="Other" name="gender" /> 
                    <a> Male </a>
                </div>
            </Card>
            </div>   
        </div>
    );
}
import styles from './profile.module.scss';
import { Header } from '../../components/header/header';
import { Button } from '../../components/button/button';
import logo from '../../assets/Logo.png';
import { Card } from '../../components/card/card';

export function Profile() {
    return (
        <div className={styles.container}>     
        <Header isLogin={true} selected={'Profile'} />
            <div className={styles.profileArea}>  
                <Card> 
                    <div className={styles.photoArea}>          
                        <div className={styles.photo}></div>
                        <div className={styles.userProfile}>
                            <a>alexa0898</a>
                            <a>Alexa Amazona</a>
                            <a>Garota da TI</a>
                        </div>
                    </div>
                </Card>  
            </div> 
            <div className={styles.achievementArea}>   
                <div >            
                    <a>Insígnas</a>
                </div>
            </div>  
        </div>
    );
}
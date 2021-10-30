import logo from '../../assets/Logo.png';
import styles from './header.module.scss';

interface Props {
    isLogin: boolean;
  }

export function Header(props:Props) {
    
  return (
    <div className={styles.header}  >        
        <img className={styles.logo} src={logo} alt="Logo"/>
    </div>  
    );
}
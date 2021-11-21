import logo from '../../assets/Logo.png';
import backButton from '../../assets/icons/BackButton.svg';
import styles from './header.module.scss';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ConfigIcon } from '../../assets/icons/Config.svg';
import { ReactComponent as ContentIcon } from '../../assets/icons/Content.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';

interface Props {
  isLogin: boolean;
  selected?: string;
  needBack?: boolean; 
  characterId?:number;
}

export function Header(props: Props) {
  const history = useHistory();

  return (
    <div className={styles.header}>
      {!props.needBack ? (
      <img className={styles.logo} src={logo} alt='Logo' />
      ) : <img className={styles.backButton} src={backButton} alt='Voltar' onClick={() => history.goBack()}/>} 

      {props.isLogin ? (
        <div className={styles.buttonsMenu}>
          <a onClick={() => history.push('home', { params: props.characterId })} > 
            <ContentIcon
              className={props.selected === 'Content' ? styles.selected : ''}
            />
          </a>
          <a onClick={() => history.push('profile', { params: props.characterId })} > 
            <ProfileIcon
              className={props.selected === 'Profile' ? styles.selected : ''}
            />
          </a>
          <a onClick={() => history.push('configuration', { params: props.characterId })} > 
            <ConfigIcon
              className={props.selected === 'Configuration' ? styles.selected : ''}
            />
          </a>
        </div>
      ) : null}
    </div>
  );
}

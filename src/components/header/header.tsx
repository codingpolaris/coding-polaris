import logo from '../../assets/Logo.png';
import styles from './header.module.scss';
import { ReactComponent as ConfigIcon } from '../../assets/icons/Config.svg';
import { ReactComponent as ContentIcon } from '../../assets/icons/Content.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';

interface Props {
  isLogin: boolean;
  selected?: string;
}

export function Header(props: Props) {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} alt='Logo' />
      {props.isLogin ? (
        <div className={styles.buttonsMenu}>
          <a href="/path" > 
            <ContentIcon
              className={props.selected === 'Content' ? styles.selected : ''}
            />
          </a>
          <ProfileIcon
            className={props.selected === 'Profile' ? styles.selected : ''}
          />
          <ConfigIcon
            className={props.selected === 'Config' ? styles.selected : ''}
          />
        </div>
      ) : null}
    </div>
  );
}

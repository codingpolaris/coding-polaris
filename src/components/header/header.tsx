import logo from '../../assets/Logo.png';
import styles from './header.module.scss';
import { ReactComponent as ConfigIcon } from '../../assets/icons/Config.svg';
import { ReactComponent as ContentIcon } from '../../assets/icons/Content.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';

interface Props {
  isLogin: boolean;
}

export function Header(props: Props) {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} alt='Logo' />
      {props.isLogin ? (
        <div className={styles.buttonsMenu}>
          <ContentIcon color='red' />
          <ProfileIcon />
          <ConfigIcon className={styles.icons} />
        </div>
      ) : null}
    </div>
  );
}

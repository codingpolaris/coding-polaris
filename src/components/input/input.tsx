import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react';
import { InputType } from 'zlib';

import { ReactComponent as Eye } from '../../assets/icons/Eye.svg';

import styles from './input.module.scss';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
}
export function Input(props:Props) {
  const [showPassword, setShowPassword] = useState(false)
  function revealPassword() {
    console.log(props.type)
    setShowPassword(!showPassword)
  }

  return (
    <div>
      {
        props.isPassword ? 
        <div> 
          <input type={showPassword ? 'text' : 'password'} className={props.type==='password' ? styles.inputPassword : styles.input} {...props}/> 
            <Eye className={styles.seePassword} onClick={revealPassword}/> 
        </div> : 
          <input className={props.type==='password'? styles.inputPassword : styles.input} {...props}/>
      }
    </div>
    );
}
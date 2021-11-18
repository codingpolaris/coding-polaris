import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { InputType } from 'zlib';

import { ReactComponent as Eye } from '../../assets/icons/Eye.svg';

import styles from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props:InputProps) {
   
  function showPassword() {
    console.log("teste");
    const a = document.getElementById('seila');
    a?.setAttribute('type', 'text');
    /*if (props.type === "password") {
      props.type = ''
    }*/
  }

  return (
    <div>
    <input className={props.type==='password'? styles.inputPassword : styles.input} {...props}></input>  
      {
        props.type === "password" ? <Eye className={styles.seePassword} onClick={showPassword}/> : null
      }
    </div>
    );
}
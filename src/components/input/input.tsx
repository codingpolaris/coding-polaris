import { InputHTMLAttributes } from 'react';

import { ReactComponent as Eye } from '../../assets/icons/Eye.svg';

import styles from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props:InputProps) {
    
  return (
    <div>
    <input className={props.type==='password'? styles.inputPassword : styles.input} {...props}></input>  
      {
        props.type === "password" ? <Eye className={styles.seePassword}/> : null
      }
    </div>
    );
}
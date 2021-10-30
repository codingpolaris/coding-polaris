import { InputHTMLAttributes } from 'react';

import styles from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props:InputProps) {
    
  return (
    <input className={styles.input} {...props}/>  
    );
}
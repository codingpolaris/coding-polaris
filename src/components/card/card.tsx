import { HtmlHTMLAttributes } from 'react';

import styles from './card.module.scss';

interface DivProps extends HtmlHTMLAttributes<HTMLDivElement> {
    }

export function Card(props:DivProps) {

  return (
    <div  className={styles.card} {...props}/>  
    );
}
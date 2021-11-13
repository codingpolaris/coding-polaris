import { useHistory } from "react-router-dom";
import styles from "./path.module.scss";
import { Header } from "../../components/header/header";
import PathsComponent  from "../../components/pathsComponent/pathsComponent";

export function Path() {
  return (
    <div className={styles.container}>
      <Header isLogin={true} selected={"Content"} />
      <div className={styles.textArea}>
        <span className={styles.primaryText}>
          Agora chegou sua vez de se aprofundar em uma
          <span className={styles.stack}> stack</span>
        </span>
      </div>
      <PathsComponent />
    </div>
  );
}

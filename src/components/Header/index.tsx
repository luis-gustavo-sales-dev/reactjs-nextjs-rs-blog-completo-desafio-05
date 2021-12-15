import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header(): JSX.Element {
  // TODO
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
      </div>
    </header>
  );
}

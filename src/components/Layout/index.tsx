import Head from 'next/head';
import styles from 'styles/Home.module.css';
import { PropsWithChildren } from 'react';
import Link from 'next/link';
interface IMainLayoutProps extends PropsWithChildren {
  title?: string;
}

const Layout = ({
  children,
  title = 'Frontend Exercise',
}: IMainLayoutProps) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <nav
        style={{
          background: '#563d7c',
          boxShadow:
            '0 0.5rem 1rem rgb(0 0 0 / 5%), inset 0 -1px 0 rgb(0 0 0 / 10%)',
        }}
        className="navbar navbar-expand-sm sticky-top navbar-light"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href={`/`}>
              <a className="nav-link text-white font-weight-bold">
                Home <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={`/blog/create`}>
              <a className="nav-link text-white font-weight-bold">
                Create Blog <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}>
        <p className='mb-0 d-flex align-items-center'>
          Powered by dev
        </p>
      </footer>
    </div>
  );
};

export default Layout;

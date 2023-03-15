import React from 'react';

import styles from '../../styles/Home.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <span>Created by </span>
        <a href="https://github.com/Boshy28" target="_blank" rel="noopener noreferrer">
          Boshy28
        </a>
      </div>
    </footer>
  );
}

export default Footer;

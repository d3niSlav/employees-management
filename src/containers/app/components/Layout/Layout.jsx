import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import sfLogo from '../../../../assets/images/sf-logo.png';
import xwLogo from '../../../../assets/images/xw-logo.png';

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className={styles.navigation}>
        <a
          href="https://www.xoomworks.com/"
          className={styles.logoWrapper}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.logoImage}
            src={xwLogo}
            alt="XoomWorks"
          />
        </a>
        <ul className={styles.navigationWrapper}>
          <li className={styles.linkWrapper}>
            <NavLink
              className={styles.linkWrapper}
              to="/"
              exact
              activeClassName={styles.active}
            >
              <span>List employees</span>
            </NavLink>
          </li>
        </ul>
        <a
          href="http://scalefocus.com/"
          className={styles.logoWrapper}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.logoImage}
            src={sfLogo}
            alt="ScaleFocus"
          />
        </a>
      </nav>
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;

/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { Notifications } from '../../utils/icons';
import useDimensions from '../../hooks/useDimensions';
import styles from '../../styles/Navbar.module.scss';
import { NextRouter, useRouter } from 'next/router';
import { ROUTES } from '../../config/route';

const Profile = dynamic(import('./Profile'));
const SearchBar = dynamic(import('./SearchBar'));
const Menu = dynamic(import('./Menu'));

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps): React.ReactElement {
  const navBackground = isScrolled ? styles.navBar__filled : styles.navBar;
  const { isMobile } = useDimensions();
  const router: NextRouter = useRouter();
  
  const logout = () => {
    localStorage.removeItem('token');
    router.replace(ROUTES.HOME);
  }

  return (
    <motion.div
      className={navBackground}
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={{
        hidden: { opacity: 0, transition: { duration: 0.2 } },
        visible: { opacity: 1, transition: { duration: 0.2 } }
      }}>
      <div className={styles.navBar__left}>
        <Menu />
      </div>

      <div className={styles.navBar__right}>
        {/* <SearchBar /> */}
        {/* {!isMobile && <Notifications className={styles.icon} />} */}
        <div className={styles.logout} onClick={() => logout()}>Sair</div>
      </div>
    </motion.div>
  );
}

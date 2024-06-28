import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link_logo}>
        Blog
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts" className="btn">
            Ver Posts
          </Link>
        </li>
        <li>
          <Link href="/photos" className="btn">
            Ver Fotos
          </Link>
        </li>
        <li>
          <Link href="/newposts" className="btn">
            Novo Post
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

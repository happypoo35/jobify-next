import { FiPieChart, FiUser, FiFilePlus, FiLayers } from "react-icons/fi";
import { useSidebar } from "./SidebarContext";
import NavLink from "@/components/NavLink";

import styles from "./nav.module.scss";

export const navItems = [
  {
    name: "Stats",
    slug: "",
    icon: <FiPieChart />,
  },
  {
    name: "All Jobs",
    slug: "/jobs",
    icon: <FiLayers />,
  },
  {
    name: "Add Job",
    slug: "/job",
    icon: <FiFilePlus />,
  },
  {
    name: "Profile",
    slug: "/profile",
    icon: <FiUser />,
  },
];

const Nav = ({ children }: { children?: React.ReactNode }) => {
  const { tablet, setSidebarMobile } = useSidebar();

  return (
    <nav className={styles.nav}>
      <div>
        {navItems.map((el, id) => (
          <NavLink
            key={id}
            href={`/dashboard${el.slug}`}
            exact
            onClick={() =>
              tablet && setSidebarMobile((p) => ({ ...p, animate: true }))
            }
          >
            {el.icon}
            {el.name}
          </NavLink>
        ))}
      </div>
      {children}
    </nav>
  );
};

export default Nav;

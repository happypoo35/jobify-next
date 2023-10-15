import { logout } from "./actions";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { SidebarContextProvider } from "./SidebarContext";
import Sidebar from "./Sidebar";
import SidebarMobile from "./SidebarMobile";
import ToggleSidebar from "./ToggleSidebar";

import styles from "./layout.module.scss";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboard}>
      <SidebarContextProvider>
        <Sidebar />
        <SidebarMobile />
        <div className={styles.content}>
          <header className={styles.header}>
            <div data-container>
              <Logo className={styles.logo} />
              <ToggleSidebar />
              <h1 data-h3>Dashboard</h1>
              <form action={logout} className={styles.logout}>
                <Button type="submit">Logout</Button>
              </form>
            </div>
          </header>
          {/* <Suspense fallback={<pre>Loading from layout...</pre>}> */}
          <main data-container>{children}</main>
          {/* </Suspense> */}
        </div>
      </SidebarContextProvider>
    </div>
  );
};

export default Layout;

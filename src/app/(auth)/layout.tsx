import { FormContainer } from "@/components/Form";
import Logo from "@/components/Logo";

import styles from "./layout.module.scss";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles.main} data-container>
      <FormContainer className={styles.card}>
        <Logo />
        {children}
      </FormContainer>
    </main>
  );
};

export default AuthLayout;

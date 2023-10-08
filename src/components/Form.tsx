import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

import styles from "./form.module.scss";

export const FormContainer: React.FC<
  PropsWithChildren & JSX.IntrinsicElements["section"]
> = ({ children, className, ...props }) => {
  return (
    <section className={cn([styles.container, className])} {...props}>
      {children}
    </section>
  );
};

export const Form: React.FC<
  PropsWithChildren & JSX.IntrinsicElements["form"]
> = ({ children, className, ...props }) => {
  return (
    <form className={cn([styles.form, className])} noValidate {...props}>
      {children}
    </form>
  );
};

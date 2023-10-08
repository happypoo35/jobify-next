import Link, { LinkProps } from "next/link";
import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  // useEffect,
  // useState,
} from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import Spinner from "@/assets/spinner.svg";
// import { Alert } from "@/hooks/useAlert";
import { Alert } from "@/hooks/useAlert";

import s from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  alert?: Alert;
}

interface ButtonLinkProps extends LinkProps {
  variant?: string;
}

// const useAlert = () => {
//   const [alert, setAlert] = useState<Alert>(null);

//   useEffect(() => {
//     if (!alert) return;
//     setTimeout(() => setAlert(null), 2000);
//   }, [alert]);

//   return { alert, setAlert };
// };

const Button: React.FC<PropsWithChildren & ButtonProps> = ({
  children,
  variant = "primary",
  isLoading,
  alert,
  ...props
}) => {
  const message = isLoading ? (
    <>
      <Spinner /> Processing...
    </>
  ) : alert ? (
    <>
      {alert.isSuccess ? <FiCheckCircle /> : <FiAlertCircle />} {alert.message}
    </>
  ) : (
    children
  );

  return (
    <button
      className={s.btn}
      data-loading={isLoading || undefined}
      data-success={alert ? alert.isSuccess : undefined}
      data-variant={variant}
      {...props}
    >
      {message}
    </button>
  );
};

export const ButtonLink: React.FC<PropsWithChildren & ButtonLinkProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <Link className={s.btn} data-variant={variant} {...props}>
      {children}
    </Link>
  );
};

export const ButtonInline: React.FC<
  PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button className={s.inline} {...props}>
      {children}
    </button>
  );
};

export default Button;

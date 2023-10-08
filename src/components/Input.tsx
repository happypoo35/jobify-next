"use client";

import { useId, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { cn } from "@/utils/cn";

import styles from "./input.module.scss";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  error?: string;
  children?: React.ReactNode;
  valueAsNumber?: boolean;
  variant?: boolean;
  onChange?: () => void;
  register?: UseFormRegister<T>;
}

const Input = <T extends FieldValues>({
  error,
  label,
  children,
  name,
  valueAsNumber,
  variant,
  className,
  type = "text",
  onChange,
  register,
  ...props
}: InputProps<T> & JSX.IntrinsicElements["input"]) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  const isPassword = type === "password";

  return (
    <div
      className={cn([styles.input, className])}
      data-error={!!error || undefined}
      data-variant={variant || undefined}
    >
      <input
        {...(register &&
          register(name, {
            valueAsNumber,
            onChange,
          }))}
        id={inputId}
        type={isPassword ? (showPassword ? "text" : type) : type}
        placeholder=" "
        data-error={!!error || undefined}
        {...props}
      />
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      {isPassword && (
        <button
          className={styles.showPassword}
          onClick={() => setShowPassword((p) => (p = !p))}
          type="button"
          aria-label="Показать/Скрыть пароль"
          tabIndex={-1}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </button>
      )}
      {error && error !== ` ` && <em>{error}</em>}
      {children}
    </div>
  );
};

export default Input;

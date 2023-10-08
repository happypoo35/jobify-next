import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/utils/cn";

import styles from "./checkbox.module.scss";

interface InputProps<T extends FieldValues> {
  variant?: "box" | "switch";
  name: Path<T>;
  onChange?: () => void;
  register?: UseFormRegister<T>;
  children?: React.ReactNode;
}

const Checkbox = <T extends FieldValues>({
  variant = "switch",
  name,
  onChange,
  register,
  style,
  children,
  className,
  ...props
}: InputProps<T> & JSX.IntrinsicElements["input"]) => (
  <div className={cn([styles.container, className])} style={style}>
    <label className={styles.checkbox} data-variant={variant}>
      {children}
      <input
        type="checkbox"
        {...(register &&
          register(name, {
            onChange,
          }))}
        {...props}
      />
      <span className={styles.checkmark} />
    </label>
  </div>
);

export default Checkbox;

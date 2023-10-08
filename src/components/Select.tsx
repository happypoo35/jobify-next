"use client";

import { useRef, useState } from "react";
import {
  FieldValues,
  UseFormSetValue,
  UseFormRegister,
  FieldPathValue,
  FieldPath,
  PathValue,
} from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils/cn";

import sInput from "./input.module.scss";
import styles from "./select.module.scss";

type SelectProps<T extends FieldValues, N extends FieldPath<T>> = {
  name: N;
  options: FieldPathValue<T, N>[];
  label?: string;
  error?: string;
  selected?: string;
  variant?: boolean;
  setValue: UseFormSetValue<T>;
  register: UseFormRegister<T>;
  setURLParam?: (key: string, value: string) => void;
};

const Select = <T extends FieldValues, N extends FieldPath<T>>({
  name,
  options,
  label,
  error,
  selected,
  variant,
  setValue,
  register,
  setURLParam,
  ...props
}: SelectProps<T, N> & JSX.IntrinsicElements["input"]) => {
  const [show, setShow] = useState(false);
  const selectRef = useRef(null);

  useOutsideClick(selectRef, () => setShow(false));

  const setSelected = (el: PathValue<T, N>) => {
    setValue(name, el, { shouldDirty: true });
    setURLParam?.(name, el);
  };

  return (
    <div
      className={cn([sInput.input, styles.select])}
      data-error={error}
      data-variant={variant || undefined}
      data-active={show || undefined}
      onClick={() => setShow((p) => !p)}
      ref={selectRef}
    >
      <input
        {...register(name)}
        id={`${name}-input`}
        placeholder=" "
        defaultValue={selected}
        {...props}
      />
      <label htmlFor={`${name}-input`}>{label || name}</label>
      <FiChevronDown className={styles.arrow} />
      {error && error !== ` ` && <em>{error}</em>}
      <ul className={styles.dropdown} role="listbox">
        {options.map((el, id) => (
          <li
            key={id}
            className={styles.item}
            data-active={el === selected || undefined}
            onClick={() => setSelected(el)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;

import { RefObject, useEffect } from "react";

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: MouseEvent) => void,
  exceptions: string[] = []
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isException = exceptions.some((el) => el === target.classList[0]);
      if (!ref.current || ref.current.contains(target) || isException) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, exceptions]);
};

export default useOutsideClick;

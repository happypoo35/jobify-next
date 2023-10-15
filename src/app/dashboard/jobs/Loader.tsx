"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Spinner from "@/assets/spinner.svg";

import styles from "./loader.module.scss";

const Loader = ({ isPending }: { isPending: boolean }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted) {
    const doc = document.getElementById("jobList");

    if (doc)
      return createPortal(
        <div className={styles.loader} aria-hidden={!isPending || undefined}>
          <Spinner className={styles.spinner} />
        </div>,
        doc
      );
  }

  return null;
};

export default Loader;

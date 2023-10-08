"use client";

import { useRef, useState, useTransition } from "react";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { deleteJob } from "./actions";
import { useOutsideClick } from "@/hooks";
import Spinner from "@/assets/spinner.svg";

import styles from "./jobCardOptions.module.scss";

const JobCardOptions = ({ jobId }: { jobId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const optionsRef = useRef(null);

  useOutsideClick(optionsRef, () => setShow(false));

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteJob(jobId);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className={styles.options} ref={optionsRef}>
      <button
        className={styles.btn}
        aria-label="toggle-menu"
        onClick={() => setShow((p) => !p)}
      >
        <FiMoreVertical />
      </button>
      <div
        className={styles.dropdown}
        data-active={show || undefined}
        role="menu"
      >
        <Link href={`./job/${jobId}`} className={styles.item}>
          <FiEdit /> Edit
        </Link>
        <span className={styles.item} onClick={handleDelete}>
          {isPending ? (
            <>
              <Spinner /> Deleting...
            </>
          ) : (
            <>
              <FiTrash2 /> Delete
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default JobCardOptions;

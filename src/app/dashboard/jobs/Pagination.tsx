"use client";

import { useCallback, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/hooks";
import { createUrl } from "@/utils/createUrl";
import { usePagination } from "@/hooks";

import styles from "./pagination.module.scss";

const Pagination = ({
  pageCount,
  currentPage,
}: {
  pageCount: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mobile = useMediaQuery("mobile");

  const pages = usePagination({
    pageCount,
    currentPage,
    siblingCount: mobile ? 0 : 1,
  });

  const handleSetPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);

      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }

      router.push(createUrl(pathname, params));
    },
    [pathname, router, searchParams]
  );

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      handleSetPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSetPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (currentPage > pageCount) {
      handleSetPage(1);
    }
  }, [currentPage, pageCount, handleSetPage]);

  if (pageCount < 2) return null;

  return (
    <div className={styles.container}>
      <button
        className={styles.arrow}
        onClick={handlePrevPage}
        aria-label="Previous page"
      >
        <FiArrowLeft />
      </button>
      {pages?.map((el, id) => {
        if (typeof el === "string") {
          return <span key={id}>&#8230;</span>;
        }
        return (
          <button
            key={id}
            className={styles.btn}
            data-active={el === currentPage || undefined}
            onClick={() => handleSetPage(el)}
            aria-label={`Go to page ${el}`}
          >
            {el}
          </button>
        );
      })}
      <button
        className={styles.arrow}
        onClick={handleNextPage}
        aria-label="Next page"
      >
        <FiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;

"use client";

import { useMemo, useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import { JobType, StatusType } from "@prisma/client";
import { createUrl } from "@/utils/createUrl";
import { SORT_OPTS } from "@/utils/constants";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import JobsLoader from "./JobsLoader";

import styles from "./filters.module.scss";

const Filters = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement | null>(null);

  const setURLParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!["all", "latest"].includes(value)) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.replace(createUrl(pathname, params));
    });
  };

  const debouncedSearchHandler = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value) {
          params.set("search", e.target.value);
        } else {
          params.delete("search");
        }

        startTransition(() => {
          router.replace(createUrl(pathname, params));
        });
      }, 500),
    [pathname, router, searchParams]
  );

  return (
    <>
      {isPending && <JobsLoader />}
      <form ref={formRef} className={styles.container}>
        <fieldset>
          <Input
            autoComplete="off"
            label="search"
            name="search"
            defaultValue={searchParams.get("search") || ""}
            onChange={debouncedSearchHandler}
            variant
          />
          <Select
            name="status"
            options={["all", ...Object.values(StatusType)]}
            defaultValue={searchParams.get("status") || "all"}
            setURLParam={setURLParam}
            variant
          />
          <Select
            name="jobType"
            label="type"
            options={["all", ...Object.values(JobType)]}
            defaultValue={searchParams.get("jobType") || "all"}
            setURLParam={setURLParam}
            variant
          />
          <Select
            name="sort"
            options={SORT_OPTS}
            defaultValue={searchParams.get("sort") || "latest"}
            setURLParam={setURLParam}
            variant
          />
        </fieldset>
        <Button
          type="reset"
          // href="./jobs"
          variant="inline"
          // onClick={() => formRef.current?.reset()}
          onClick={() => {
            startTransition(() => {
              router.replace("./jobs");
            });
          }}
        >
          Clear filters
        </Button>
      </form>
    </>
  );
};

export default Filters;

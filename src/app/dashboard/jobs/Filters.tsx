"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { JobType, StatusType } from "@prisma/client";
import { useDebounce } from "@/hooks";
import { createUrl } from "@/utils/createUrl";
import { SORT_OPTS } from "@/utils/constants";
import { ButtonLink } from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";

import styles from "./filters.module.scss";

interface Props {
  jobsCount: number;
  page: number;
  limit: number;
}

const Filters = ({ jobsCount = 0, page, limit }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValues = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      status: searchParams.get("status") || "all",
      jobType: searchParams.get("jobType") || "all",
      sort: searchParams.get("sort") || "latest",
    }),
    [searchParams]
  );

  const { register, setValue, getValues, watch, reset } = useForm({
    defaultValues,
  });

  const search = watch("search");
  const debouncedSearch = useDebounce(search);

  const setURLParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!["all", "latest"].includes(value)) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(createUrl(pathname, params));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (search === params.get(search)) return;

    if (debouncedSearch && search) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(createUrl(pathname, params));
  }, [debouncedSearch, search, pathname, router, page, searchParams]);

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const resultsText = (
    <span>
      Displaying{" "}
      <b>
        {(page - 1) * limit + 1}-
        {page * limit < jobsCount ? page * limit : jobsCount}
      </b>{" "}
      of {jobsCount} job{jobsCount !== 1 ? "s" : ""} found
    </span>
  );

  return (
    <div className={styles.container}>
      <form>
        <Input
          name="search"
          register={register}
          label="search"
          autoComplete="off"
          defaultValue={searchParams.get("search") || ""}
          variant
        />
        <Select
          name="status"
          options={["all", ...Object.values(StatusType)]}
          selected={getValues("status")}
          setValue={setValue}
          register={register}
          setURLParam={setURLParam}
          variant
        />
        <Select
          name="jobType"
          label="type"
          options={["all", ...Object.values(JobType)]}
          selected={getValues("jobType")}
          setValue={setValue}
          register={register}
          setURLParam={setURLParam}
          variant
        />
        <Select
          name="sort"
          options={SORT_OPTS}
          selected={getValues("sort")}
          setValue={setValue}
          register={register}
          setURLParam={setURLParam}
          variant
        />
      </form>
      <div className={styles.stats}>
        <span>
          {jobsCount > 0 ? <FiEye /> : <FiEyeOff />}
          {jobsCount > 0 ? resultsText : "no jobs to display"}
        </span>
        <ButtonLink href="./jobs" variant="inline">
          Clear filters
        </ButtonLink>
      </div>
    </div>
  );
};

export default Filters;

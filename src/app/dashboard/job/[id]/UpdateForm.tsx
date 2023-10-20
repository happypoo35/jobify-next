"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Job, JobType, StatusType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAlert } from "@/hooks";
import { FormData, updateJob } from "./actions";
import { Form, FormContainer } from "@/components/Form";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";

const schema = yup.object().shape({
  position: yup
    .string()
    .required("Can not be empty")
    .max(100, "Can not be more than 100 characters"),
  company: yup
    .string()
    .required("Can not be empty")
    .max(50, "Can not be more than 50 characters"),
  jobLocation: yup
    .string()
    .required("Can not be empty")
    .max(20, "Can not be more than 20 characters"),
  status: yup.string().required("Can not be empty"),
  jobType: yup.string().required("Can not be empty"),
});

const UpdateForm = ({ data }: { data: Job }) => {
  const [isPending, startTransition] = useTransition();
  const { alert, setAlert } = useAlert();
  const router = useRouter();

  const defaultValues = {
    position: data.position,
    company: data.company,
    status: data.status,
    jobType: data.jobType,
    jobLocation: data.jobLocation,
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const isDisabled = !isDirty || !isValid;

  const onSubmit = async (formData: FormData) => {
    if (isDisabled) return;

    startTransition(async () => {
      try {
        const res = await updateJob({ formData, jobId: data.id });
        if (!res.success) {
          setAlert({ isSuccess: false, message: "Failed" });
          return;
        }
        setAlert({ isSuccess: true, message: "Job updated!" });
        setTimeout(() => router.push("/dashboard/jobs"), 1000);
      } catch (err) {
        console.log(err);
        setAlert({ isSuccess: false, message: "Failed" });
      }
    });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 data-h3>Edit job</h2>
        <section>
          <Input
            name="position"
            register={register}
            label="position"
            error={errors.position?.message}
          />
          <Input
            name="company"
            register={register}
            label="company"
            error={errors.company?.message}
          />
          <Input
            name="jobLocation"
            label="location"
            register={register}
            error={errors.jobLocation?.message}
          />
          <Select
            name="status"
            options={Object.values(StatusType)}
            error={errors.status?.message}
            defaultValue={getValues("status")}
            setValue={setValue}
            register={register}
          />
          <Select
            name="jobType"
            label="type"
            options={Object.values(JobType)}
            error={errors.jobType?.message}
            defaultValue={getValues("jobType")}
            setValue={setValue}
            register={register}
          />
          <div data-buttons>
            <Button
              type="submit"
              alert={alert}
              isLoading={isPending}
              data-disabled={isDisabled || undefined}
            >
              Save changes
            </Button>
            <Button
              variant="inline"
              type="reset"
              onClick={(e) => {
                e.preventDefault();
                reset(defaultValues);
              }}
            >
              Reset changes
            </Button>
          </div>
        </section>
      </Form>
    </FormContainer>
  );
};
export default UpdateForm;

"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormData, updateUser } from "./actions";
import { Session } from "@/lib/session";
import { useAlert } from "@/hooks";
import { Form, FormContainer } from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please provide your first name")
    .min(3, "Name can't be less than 3 characters")
    .max(20, "Name can't be greater than 20 characters"),
  lastName: yup
    .string()
    .max(20, "Last name can't be greater than 20 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  location: yup.string().max(20, "Can't be greater than 20 characters"),
});

const UpdateForm = ({ user }: { user: Session }) => {
  const [isPending, startTransition] = useTransition();
  const { alert, setAlert } = useAlert();

  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName || "",
    email: user.email,
    location: user.location || "",
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({ resolver: yupResolver(schema), defaultValues });

  const isDisabled = !isDirty || !isValid;

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    reset();
  };

  const onSubmit = async (formData: FormData) => {
    if (isDisabled) return;

    startTransition(async () => {
      try {
        const res = await updateUser({ formData, userId: user.id });
        if (!res.success) {
          setAlert({ isSuccess: false, message: "Failed" });
          if (typeof res.error === "string") {
            setError("email", { type: "manual", message: res.error });
          }
          return;
        }

        reset(res.data);
        setAlert({ isSuccess: true, message: "Profile updated!" });
      } catch (err) {
        console.log(err);
        setAlert({ isSuccess: false, message: "Failed" });
      }
    });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 data-h3>Profile</h2>
        <section>
          <Input
            name="firstName"
            register={register}
            label="first name"
            defaultValue={defaultValues.firstName}
            error={errors.firstName?.message}
          />
          <Input
            name="lastName"
            register={register}
            label="last name"
            defaultValue={defaultValues.lastName}
            error={errors.lastName?.message}
          />
          <Input
            name="email"
            register={register}
            type="email"
            label="email"
            defaultValue={defaultValues.email}
            error={errors.email?.message}
          />
          <Input
            name="location"
            register={register}
            label="location"
            defaultValue={defaultValues.location}
            error={errors.location?.message}
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
            <Button variant="inline" type="reset" onClick={handleReset}>
              Reset changes
            </Button>
          </div>
        </section>
      </Form>
    </FormContainer>
  );
};

export default UpdateForm;

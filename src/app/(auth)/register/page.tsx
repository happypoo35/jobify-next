"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormData, createUser } from "./actions";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please provide your name")
    .min(3, "Name can't be shorter than 3 characters")
    .max(20, "Name can't be longer than 20 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password can't be shorter than 6 characters"),
  addMock: yup.bool(),
});

const Register = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    startTransition(async () => {
      try {
        const res = await createUser(data);

        if (res.success) {
          router.replace("/dashboard");
        } else {
          setError("email", { type: "manual", message: res.message });
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <section aria-label="Register">
        <Input
          name="firstName"
          register={register}
          label="name"
          error={errors.firstName?.message}
        />
        <Input
          name="email"
          register={register}
          type="email"
          label="email"
          error={errors.email?.message}
        />
        <Input
          name="password"
          register={register}
          type="password"
          label="password"
          error={errors.password?.message}
        />
        <Checkbox name="addMock" register={register}>
          Add mock data
        </Checkbox>
        <div data-buttons>
          <Button type="submit" isLoading={isPending}>
            Register
          </Button>
          <p>
            Already a member?{" "}
            <Link href="/login" data-link>
              Login
            </Link>
          </p>
        </div>
      </section>
    </Form>
  );
};

export default Register;

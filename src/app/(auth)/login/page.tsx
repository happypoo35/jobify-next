"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FormData, login } from "./actions";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      try {
        const res = await login(data);
        if (res.success) {
          router.replace("/dashboard");
        } else {
          setError("email", { type: "manual", message: " " });
          setError("password", { type: "manual", message: res.message });
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <section aria-label="Login">
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
        <div data-buttons>
          <Button type="submit" isLoading={isPending}>
            Login
          </Button>
          <p>
            Not a member yet?{" "}
            <Link href="/register" data-link>
              Register
            </Link>
          </p>
        </div>
      </section>
    </Form>
  );
};
export default Login;

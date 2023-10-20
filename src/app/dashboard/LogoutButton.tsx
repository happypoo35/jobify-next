"use client";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Button from "@/components/Button";

const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      Logout
    </Button>
  );
};

export default LogoutButton;

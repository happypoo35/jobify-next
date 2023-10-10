"use client";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import Button from "@/components/Button";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      Add mock data
    </Button>
  );
};
export default SubmitButton;

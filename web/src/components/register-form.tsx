"use client";

import { z } from "zod";
import Link from "next/link";
import { http } from "@/libs/http";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { schemaResolver, useForm } from "@mantine/form";
import { LockIcon, UserIcon } from "@phosphor-icons/react";
import {
  Anchor,
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Title
} from "@mantine/core";

const schema = z
  .object({
    email: z.email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"
  });

type Props = {
  role: User["role"];
  successHref: Route;
  loginHref: Route;
};

export function RegisterForm({
  role,
  successHref,
  loginHref
}: Readonly<Props>) {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",

    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },

    validate: schemaResolver(schema, {
      sync: true
    })
  });

  const register = useMutation({
    mutationFn: async (values: typeof form.values) => {
      await http.post("/auth/register", {
        ...values,
        role
      });
    },

    onSuccess: () => {
      router.push(successHref);
    },

    onError: (error) => {
      notifications.show({
        color: "red",
        title: "Registration Failed",
        message: error.message || "An error occurred"
      });
    }
  });

  return (
    <Stack gap="xl">
      <Title order={1} ta="center" fz={40} fw={700}>
        Sign Up
      </Title>
      <form onSubmit={form.onSubmit((values) => register.mutate(values))}>
        <Stack gap="lg">
          <TextInput
            label="Full name"
            placeholder="Enter your Full Name"
            size="md"
            leftSection={<UserIcon size={18} />}
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="Enter your Email Address"
            size="md"
            leftSection={<UserIcon size={18} />}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Create a Password"
            size="md"
            leftSection={<LockIcon size={18} />}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your Password"
            size="md"
            leftSection={<LockIcon size={18} />}
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
          <Button type="submit" size="md" mt="sm" fullWidth color="blue">
            Create an account
          </Button>
        </Stack>
      </form>
      <div className="text-center text-sm">
        <span className="text-gray-700">Already have an account? </span>
        <Anchor component={Link} href={loginHref} fw={600}>
          Login
        </Anchor>
      </div>
    </Stack>
  );
}

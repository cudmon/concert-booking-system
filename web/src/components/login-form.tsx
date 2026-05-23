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

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type Props = {
  submitLabel: string;
  successHref: Route;
  registerHref: Route;
};

export function LoginForm({
  submitLabel,
  successHref,
  registerHref
}: Readonly<Props>) {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",

    initialValues: {
      email: "",
      password: ""
    },

    validate: schemaResolver(schema, {
      sync: true
    })
  });

  const login = useMutation({
    mutationFn: async (values: typeof form.values) => {
      await http.post("/auth/login", values);
    },

    onSuccess: () => {
      router.push(successHref);
    },

    onError: (error) => {
      notifications.show({
        color: "red",
        title: "Login Failed",
        message: error.message || "An error occurred"
      });
    }
  });

  return (
    <Stack gap="xl">
      <Title order={1} ta="center" fz={40} fw={700}>
        Login
      </Title>
      <form onSubmit={form.onSubmit((values) => login.mutate(values))}>
        <Stack gap="lg">
          <TextInput
            size="md"
            label="Email"
            key={form.key("email")}
            leftSection={<UserIcon size={18} />}
            placeholder="Enter your Email Address"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            size="md"
            label="Password"
            key={form.key("password")}
            placeholder="Enter your Password"
            leftSection={<LockIcon size={18} />}
            {...form.getInputProps("password")}
          />
          <Button type="submit" size="md" mt="sm" fullWidth color="blue">
            {submitLabel}
          </Button>
        </Stack>
      </form>
      <div className="text-center text-sm">
        <span className="text-gray-700">Don&apos;t have an account? </span>
        <Anchor component={Link} href={registerHref} fw={600}>
          Create an account
        </Anchor>
      </div>
    </Stack>
  );
}

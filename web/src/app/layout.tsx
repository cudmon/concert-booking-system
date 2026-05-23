"use client";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/index.css";

import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider
} from "@mantine/core";

const font = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

const theme = createTheme({
  defaultRadius: 4
});

export default function Root({ children }: Readonly<PropsWithChildren>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={cn(font.variable, "h-full antialiased")}
    >
      <head>
        <title>Concert Booking System</title>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={new QueryClient()}>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" />
            {children}
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

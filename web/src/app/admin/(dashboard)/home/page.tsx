"use client";

import { z } from "zod";
import { useState } from "react";
import { StatCard } from "../_components/stats-card";
import { notifications } from "@mantine/notifications";
import { schemaResolver, useForm } from "@mantine/form";
import { useQueryOrders } from "@/hooks/use-query-orders";
import { ConcertCard } from "../_components/concert-card";
import { useCreateConcert } from "@/hooks/use-create-concert";
import { useQueryConcerts } from "@/hooks/use-query-concerts";
import { useRemoveConcert } from "@/hooks/use-remove-concert";
import {
  FloppyDiskIcon,
  UserIcon,
  XCircleIcon,
  SealCheckIcon
} from "@phosphor-icons/react";
import {
  Button,
  Loader,
  Modal,
  NumberInput,
  Tabs,
  Textarea,
  TextInput
} from "@mantine/core";

const schema = z.object({
  name: z.string().min(1, "Concert name is required"),
  capacity: z
    .number()
    .min(1, "Total of seat must be greater than 0")
    .max(100000, "Total of seat must be less than 100000"),
  description: z.string().optional()
});

export default function AdminHomePage() {
  const orders = useQueryOrders();
  const concerts = useQueryConcerts();

  const create = useCreateConcert();
  const remove = useRemoveConcert();

  const [activeTab, setActiveTab] = useState<string | null>("overview");
  const [pendingDelete, setPendingDelete] = useState<Concert | null>(null);

  const form = useForm({
    mode: "uncontrolled",

    initialValues: {
      name: "",
      capacity: 500,
      description: ""
    },

    validate: schemaResolver(schema, {
      sync: true
    })
  });

  const onCreate = (values: z.infer<typeof schema>) => {
    create.mutate(values, {
      onSuccess() {
        form.reset();
        concerts.refetch();
        setActiveTab("overview");
        notifications.show({
          message: "Create successfully",
          color: "teal"
        });
      },

      onError(e) {
        notifications.show({
          message: e.message || "Create failed",
          color: "red"
        });
      }
    });
  };

  const onRemove = (id: number) => {
    remove.mutate(id, {
      onSuccess() {
        concerts.refetch();
        setPendingDelete(null);

        notifications.show({
          message: "Delete successfully",
          color: "teal"
        });
      },

      onError(e) {
        notifications.show({
          message: e.message || "Delete failed",
          color: "red"
        });
      }
    });
  };

  if (!concerts.data || !orders.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          label="Total of seats"
          background="#0070A4"
          icon={<UserIcon size={28} weight="regular" />}
          value={concerts.data.reduce(
            (total, concert) => total + concert.capacity,
            0
          )}
        />
        <StatCard
          label="Reserve"
          background="#00A58B"
          icon={<SealCheckIcon size={28} weight="regular" />}
          value={concerts.data.reduce(
            (total, concert) => total + concert.sold_tickets,
            0
          )}
        />
        <StatCard
          label="Cancel"
          background="#F96464"
          icon={<XCircleIcon size={28} weight="regular" />}
          value={
            orders.data.filter((order) => order.status === "CANCELLED").length
          }
        />
      </div>
      <Tabs value={activeTab} onChange={setActiveTab} color="blue">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="create">Create</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview" pt="lg">
          <div className="space-y-6">
            {concerts.data.map((concert) => (
              <ConcertCard
                key={concert.id}
                concert={concert}
                onDelete={() => setPendingDelete(concert)}
              />
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="create" pt="lg">
          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-8">
            <h2 className="text-2xl font-bold text-[#1A8FE3]">Create</h2>
            <div className="my-6 border-t border-gray-200" />
            <form onSubmit={form.onSubmit((values) => onCreate(values))}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  label="Concert Name"
                  placeholder="Please input concert name"
                  size="md"
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                />
                <NumberInput
                  label="Total of seat"
                  placeholder="500"
                  size="md"
                  min={1}
                  hideControls
                  rightSection={<UserIcon size={18} />}
                  key={form.key("capacity")}
                  {...form.getInputProps("capacity")}
                />
              </div>
              <div className="mt-6">
                <Textarea
                  label="Description"
                  placeholder="Please input description"
                  size="md"
                  minRows={4}
                  autosize
                  key={form.key("description")}
                  {...form.getInputProps("description")}
                />
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  type="submit"
                  size="md"
                  color="blue"
                  className="w-full sm:w-auto"
                  leftSection={<FloppyDiskIcon size={18} />}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Tabs.Panel>
      </Tabs>
      <Modal
        centered
        size="sm"
        radius="md"
        withCloseButton={false}
        opened={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
      >
        <div className="flex flex-col items-center px-2 py-4 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EF5350]">
            <XCircleIcon size={36} color="#ffffff" weight="bold" />
          </div>
          <p className="text-base font-semibold text-gray-900">
            Are you sure to delete?
          </p>
          <p className="mt-1 text-base font-semibold text-gray-900">
            &ldquo;{pendingDelete?.name}&rdquo;
          </p>
          <div className="mt-6 flex w-full gap-3">
            <Button
              size="md"
              fullWidth
              variant="default"
              onClick={() => setPendingDelete(null)}
            >
              Cancel
            </Button>
            <Button
              size="md"
              fullWidth
              color="red"
              onClick={() => {
                if (pendingDelete) {
                  onRemove(pendingDelete.id);
                }
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

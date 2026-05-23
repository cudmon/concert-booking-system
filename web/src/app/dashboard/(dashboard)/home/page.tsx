"use client";

import { useMemo } from "react";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ConcertCard } from "../_components/concert-card";
import { useCancelOrder } from "@/hooks/use-cancel-order";
import { useReserveOrder } from "@/hooks/use-reserve-order";
import { useQueryConcerts } from "@/hooks/use-query-concerts";
import { useQueryMyOrders } from "@/hooks/use-query-my-orders";

export default function Page() {
  const orders = useQueryMyOrders();
  const concerts = useQueryConcerts();

  const reserve = useReserveOrder();
  const cancel = useCancelOrder();

  const onReserve = (concert: Concert) => {
    reserve.mutate(concert.id, {
      onSuccess: () => {
        orders.refetch();

        notifications.show({
          title: "Success",
          message: "Concert reserved successfully",
          color: "green"
        });
      },

      onError: (e) => {
        notifications.show({
          message: e.message || "Failed to reserve concert",
          color: "red"
        });
      }
    });
  };

  const onCancel = (order: Order) => {
    cancel.mutate(order.id, {
      onSuccess: () => {
        orders.refetch();

        notifications.show({
          title: "Success",
          message: "Concert canceled successfully",
          color: "green"
        });
      },

      onError: (e) => {
        notifications.show({
          message: e.message || "Failed to cancel concert",
          color: "red"
        });
      }
    });
  };

  const orderMap = useMemo(() => {
    const map = new Map<number, Order>();

    if (!orders.data) return map;

    for (const order of orders.data) {
      const current = map.get(order.concert_id);

      if (
        !current ||
        new Date(order.created_at) > new Date(current.created_at)
      ) {
        map.set(order.concert_id, order);
      }
    }

    return map;
  }, [orders.data]);

  if (!concerts.data || !orders.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {concerts.data.map((concert) => (
        <ConcertCard
          key={concert.id}
          concert={concert}
          order={orderMap.get(concert.id) || null}
          onCancel={(order) => onCancel(order)}
          onReserve={(concert) => onReserve(concert)}
        />
      ))}
    </div>
  );
}

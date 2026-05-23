"use client";

import { Loader, Table } from "@mantine/core";
import { capitalize } from "@/utils/capitalize";
import { useQueryOrders } from "@/hooks/use-query-orders";

export default function HistoryPage() {
  const orders = useQueryOrders();

  if (!orders.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-2">
        <Table verticalSpacing="sm" horizontalSpacing="md" miw={640}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date time</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Concert name</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders.data.map((row) => (
              <Table.Tr key={row.id}>
                <Table.Td>{new Date(row.created_at).toLocaleString()}</Table.Td>
                <Table.Td>{row.user.name}</Table.Td>
                <Table.Td>{row.concert.name}</Table.Td>
                <Table.Td>{capitalize(row.status)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}

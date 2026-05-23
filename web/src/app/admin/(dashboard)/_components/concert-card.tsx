import { Button } from "@mantine/core";
import { TrashIcon, UserIcon } from "@phosphor-icons/react";

type Props = {
  concert: Concert;
  onDelete: () => void;
};

export function ConcertCard({ concert, onDelete }: Readonly<Props>) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
      <h3 className="text-xl font-bold wrap-break-word text-[#1A8FE3] sm:text-2xl">
        {concert.name}
      </h3>
      <div className="my-4 border-t border-gray-200" />
      {concert.description && (
        <p className="text-base leading-relaxed wrap-break-word text-gray-800">
          {concert.description}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-gray-700">
          <UserIcon size={20} />
          <span className="text-base">{concert.capacity}</span>
        </div>
        <Button
          size="md"
          color="red"
          onClick={onDelete}
          leftSection={<TrashIcon size={18} />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

type Concert = {
  id: string;
  name: string;
  capacity: number;
  sold_tickets: number;
  description?: string;
};

type Order = {
  id: string;
  status: "RESERVED" | "CANCELLED";
  user_id: string;
  concert_id: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

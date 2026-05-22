type Concert = {
  id: number;
  name: string;
  capacity: number;
  sold_tickets: number;
  description?: string;
};

type Order = {
  id: number;
  status: "RESERVED" | "CANCELLED";
  user_id: number;
  user: User;
  concert_id: number;
  concert: Concert;
  created_at: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

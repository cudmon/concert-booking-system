export interface IOrderCreate {
  concert_id: number;
  user_id: number;
}

export interface IOrderCancel {
  id: number;
  user_id: number;
}

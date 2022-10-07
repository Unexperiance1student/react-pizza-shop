export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number[];
  size: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  COMPLETED = 'succes',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

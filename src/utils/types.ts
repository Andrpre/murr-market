export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  }
  
export interface CartItem extends Product {
  quantity: number;
}
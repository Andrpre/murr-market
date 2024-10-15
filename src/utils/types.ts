export enum RequestStatus {
  Idle = "Idle",
  Loading = "Loading",
  Success = "Success",
  Failed = "Failed",
}

export interface Product {
  id: string;
  name: string;
  price: {
    current: number;
    old: number;
  };
  image: {
    url: {
      main: string;
      catalog: string;
      additional: string[];
    };
    bgColor: string;
  };
  description: {
    main: string;
    advantages: string;
    usage: string;
  };
  tags: {
    name: string;
    color: string;
  }[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderData {
  name: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
  items: CartItem[];
  totalAmount: number;
}

import { Product } from "../../../utils/types";

export interface ProductPriceProps extends Pick<Product, "price"> {
  fontSize?: number;
}
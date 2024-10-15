import { Product } from "../../../utils/types";

export interface ProductTagsProps {
  product: Product;
  fontSize?: number;
  direction?: "column" | "row";
}
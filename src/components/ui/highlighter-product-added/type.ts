import { ReactNode } from "react";

export interface HighlighterProductAddedProps {
  productId: string;
  children: ReactNode;
  hover: boolean;
}

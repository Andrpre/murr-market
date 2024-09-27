import React from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import { Button } from "antd";
import { ProductCardProps } from "../../product-card/type";
import {
  addItemToCart,
  removeItemFromCart,
  selectCartItems,
} from "../../../slices/cartSlice";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export const CartCounter: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
  
    const getProductQuantity = () => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      return cartItem ? cartItem.quantity : 0;
    };
  
    const quantity = getProductQuantity();
  
    const blockDefault = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };
  
    const handleClickAdd = (e: React.MouseEvent) => {
      blockDefault(e);
      dispatch(addItemToCart(product));
    };
    const handleClickRemove = (e: React.MouseEvent) => {
      blockDefault(e);
      dispatch(removeItemFromCart(product.id));
    };
    return (
        <div>
          {quantity !== 0 && (
            <>
              <Button onClick={handleClickRemove}>
                {quantity === 1 ? <DeleteRoundedIcon /> : <RemoveRoundedIcon />}
              </Button>
              <span style={{ margin: "0 10px" }}>{quantity}</span>
            </>
          )}
          <Button onClick={handleClickAdd}>
            <AddRoundedIcon />
          </Button>
        </div>
    )
}
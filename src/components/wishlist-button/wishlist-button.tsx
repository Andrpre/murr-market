import React from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Button } from "antd";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  selectWishlistItems,
} from "../../slices/wishlistSlice";
import { WishlistButtonProps } from "./type";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(selectWishlistItems);

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(product.id));
    } else {
      dispatch(addItemToWishlist(product));
    }
  };

  return (
    <Button type="text" shape="circle" size="large" onClick={handleToggleWishlist}>
      {isInWishlist ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
    </Button>
  );
};

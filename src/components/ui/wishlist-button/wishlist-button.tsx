import React, { useCallback, useMemo } from "react";
import { Button } from "antd";
import clsx from "clsx";

import {
  useDispatch,
  useSelector,
} from "../../../services/hooks";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  selectWishlistItems,
} from "../../../slices/wishlistSlice";
import { WishlistButtonProps } from "./type";
import { ReactComponent as FavoriteIcon } from "../../../assets/heart.svg";

export const WishlistButton: React.FC<
  WishlistButtonProps
> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const isInWishlist = useMemo(
    () =>
      wishlistItems.some((item) => item.id === product.id),
    [wishlistItems, product.id]
  );

  const handleToggleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(
        isInWishlist
          ? removeItemFromWishlist(product.id)
          : addItemToWishlist(product)
      );
    },
    [dispatch, isInWishlist, product.id]
  );

  return (
    <Button
      type="text"
      shape="circle"
      size="large"
      onClick={handleToggleWishlist}
    >
      <FavoriteIcon
        className={clsx("icon_size_medium", "icon_hover")}
        fill={isInWishlist ? undefined : "#fff"}
        stroke={isInWishlist ? undefined : "#000"}
        strokeWidth={isInWishlist ? undefined : 32}
      />
    </Button>
  );
};

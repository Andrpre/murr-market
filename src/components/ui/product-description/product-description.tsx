import React, { useMemo } from "react";
import DOMPurify from "dompurify";
import { ProductDescriptionProps } from "./type";

export const ProductDescription: React.FC<
  ProductDescriptionProps
> = ({ description }) => {
  const sanitizedDescription = useMemo(() => {
    if (!description) return "";
    return DOMPurify.sanitize(description);
  }, [description]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedDescription,
      }}
    />
  );
};

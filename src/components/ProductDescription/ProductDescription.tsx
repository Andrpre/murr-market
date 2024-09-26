import React from 'react';
import DOMPurify from 'dompurify';

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
  );
};

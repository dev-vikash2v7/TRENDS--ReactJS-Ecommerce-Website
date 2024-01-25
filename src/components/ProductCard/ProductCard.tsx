// ProductCard.tsx
import React from "react";
import { Box, CardMedia, Typography, Button } from "@mui/material";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
  onAddToCart,
} : ProductCardProps) => {
  return (
    <Box sx={{ maxWidth: 210, m: 1 }}>
      <Box
        sx={{
          border: "1px solid #eee",
          borderRadius: "4px",
          overflow: "hidden",
          height: 180,
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          image={imageUrl}
          sx={{ height: "100%", objectFit: "contain" }}
        />
      </Box>
      <Typography
        gutterBottom
        variant="subtitle1"
        component="div"
        sx={{ textAlign: "center", mt: 1 }}
      >
        {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        ${price.toFixed(2)}
      </Typography>
      <Button
        variant="outlined"
        onClick={onAddToCart}
        sx={{ width: "100%", mt: 1, color: "black", borderColor: "black" }}
      >
        ADD TO CART
      </Button>
    </Box>
  );
};

export default ProductCard;

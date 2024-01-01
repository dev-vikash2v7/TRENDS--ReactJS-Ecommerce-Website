import React, { useState } from "react";
import { Box, CardMedia, IconButton } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomPopup from "../ZoomPopup/ZoomPopup";

interface ImageGalleryProps {
  images: string[];
  onSelectImage: (imagePath: string) => void; // This function needs to be used within the component
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onSelectImage,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    onSelectImage(image); // Call the function passed via props
  };

  return (
    <Box>
      <Box sx={{ width: "100%", height: "auto", position: "relative" }}>
        <CardMedia
          component="img"
          image={selectedImage}
          alt="Product Image"
          sx={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain" }}
        />
        <IconButton
          onClick={() => setIsZoomed(true)}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <ZoomInIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            image={image}
            alt={`Thumbnail ${index + 1}`}
            sx={{
              maxWidth: "100px",
              maxHeight: "100px",
              objectFit: "contain",
              cursor: "pointer",
              margin: "0 10px",
              border: selectedImage === image ? "2px solid #1976d2" : "", // Optional: Highlight selected thumbnail
            }}
            onClick={() => handleSelectImage(image)}
          />
        ))}
      </Box>
      {isZoomed && (
        <ZoomPopup image={selectedImage} onClose={() => setIsZoomed(false)} />
      )}
    </Box>
  );
};

export default ImageGallery;

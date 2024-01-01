import React from "react";
import { Box, Modal, IconButton, CardMedia } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ZoomPopupProps {
  image: string;
  onClose: () => void;
}

const ZoomPopup: React.FC<ZoomPopupProps> = ({ image, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
        <CardMedia
          component="img"
          image={image}
          alt="Zoomed Product Image"
          sx={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
        />
      </Box>
    </Modal>
  );
};

export default ZoomPopup;

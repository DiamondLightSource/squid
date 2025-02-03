import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export type ConfirmModalProps = {
  question: string;
  title: string;
  description?: string;
  onConfirm: () => void;
};

export default function ConfirmModal({
  question,
  title,
  description,
  onConfirm,
}: ConfirmModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{question}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => {
                onConfirm();
                handleClose();
              }}
              color="warning"
            >
              Confirm?
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Reject
            </Button>
          </Stack>
          {description && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}

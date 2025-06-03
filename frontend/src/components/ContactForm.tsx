import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";

const statuses = ["Active", "Inactive"];

export default function ContactForm({ open, handleClose, onSave, contact }) {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    country: "", status: "Active",
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (contact) setForm(contact);
    else setForm({
      name: "", company: "", email: "", phone: "",
      country: "", status: "Active",
    });
  }, [contact]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSave(form);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
          color: "#5e35b1",
        }}
      >
        {contact ? "Edit Contact" : "Add Contact"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mt: 2,
        }}
      >
        {["name", "company", "email", "phone", "country"].map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={form[field]}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
            InputLabelProps={{
              style: { color: "#5e35b1" }
            }}
          />
        ))}

        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{
            gridColumn: { sm: "1 / -1" },
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
          InputLabelProps={{
            style: { color: "#5e35b1" }
          }}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "space-between",
          px: 3,
          pb: 2,
          pt: 3,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
            color: "#5e35b1",
            border: "1px solid #ce93d8",
            "&:hover": {
              backgroundColor: "#f3e5f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
            background: "linear-gradient(90deg, #42a5f5, #7e57c2)",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            transition: "0.3s",
            "&:hover": {
              background: "linear-gradient(90deg, #2196f3, #673ab7)",
              transform: "scale(1.03)",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

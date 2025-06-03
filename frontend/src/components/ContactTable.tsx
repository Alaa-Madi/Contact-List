import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TableSortLabel,
  TextField, Pagination,
  Box
} from "@mui/material";
import { getContacts, addContact, updateContact, deleteContact } from "../services/api.ts";
import ContactForm from "./ContactForm.tsx";

interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  status: string;
}

const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Contact>("name");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [contacts, filter]);

  const fetchData = async () => {
    try {
      const res = await getContacts();
      setContacts(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleSave = async (contact: Contact) => {
    if (contact.id) {
      await updateContact(contact.id, contact);
    } else {
      await addContact(contact);
    }
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteContact(id);
    fetchData();
  };

  const handleFilter = () => {
    const filtered = contacts.filter((c) =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredContacts(filtered);
    setCurrentPage(1);
  };

  const handleSort = (field: keyof Contact) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Box
        component={Paper}
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: 3,
          mb: 3,
          borderRadius: 4,
          background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 240,
            bgcolor: "white",
            borderRadius: 2,
          }}
        />
        <Button
          onClick={() => {
            setSelectedContact(null);
            setOpen(true);
          }}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 3,
            fontWeight: "bold",
            textTransform: "none",
            color: "#fff",
            background: "linear-gradient(90deg, #42a5f5, #7e57c2)",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            transition: "0.3s",
            "&:hover": {
              background: "linear-gradient(90deg, #2196f3, #673ab7)",
              transform: "scale(1.03)",
            }
          }}
        >
          Add Contact
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          background: "#fefefe",
          borderRadius: 4,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        }}
      >
        <Table>
          <TableHead sx={{ background: "#f3e5f5" }}>
            <TableRow>
              {["name", "company", "email", "phone", "country", "status"].map((field) => (
                <TableCell key={field} sx={{ fontWeight: "bold", color: "#5e35b1" }}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : "asc"}
                    onClick={() => handleSort(field as keyof Contact)}
                  >
                    {field.toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold", color: "#5e35b1" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow
                key={contact.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f3f3f3",
                    transition: "0.2s",
                  },
                }}
              >
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.country}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      display: "inline-block",
                      fontSize: "0.8rem",
                      color: contact.status === "Active" ? "#2e7d32" : "#c62828",
                      backgroundColor: contact.status === "Active" ? "#e8f5e9" : "#ffebee",
                    }}
                  >
                    {contact.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setSelectedContact(contact);
                      setOpen(true);
                    }}
                    sx={{
                      borderRadius: 2,
                      mr: 1,
                      color: "#512da8",
                      borderColor: "#9575cd",
                      "&:hover": {
                        backgroundColor: "#ede7f6",
                      }
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(contact.id)}
                    sx={{
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#ffebee",
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          count={Math.ceil(filteredContacts.length / itemsPerPage)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{
            m: 3,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "#7b1fa2",
              borderRadius: "50%",
              "&.Mui-selected": {
                backgroundColor: "#ce93d8",
              }
            }
          }}
        />
      </TableContainer>


      <ContactForm
        open={open}
        handleClose={() => setOpen(false)}
        onSave={handleSave}
        contact={selectedContact}
      />
    </>
  );
};

export default ContactTable;

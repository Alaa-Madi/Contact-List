import React from "react";
import { Container, Typography } from "@mui/material";
import ContactTable from "./components/ContactTable.tsx";

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact List
      </Typography>
      <ContactTable />
    </Container>
  );
}

export default App;

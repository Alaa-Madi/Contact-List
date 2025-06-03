const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const contactRoutes = require('./routes/contactRoutes');


app.use(cors());
app.use(express.json());

app.use('/contacts', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

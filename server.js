const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ✅ zde je API router
const apiRoutes = require('./api/api');
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const sequelize = require('./models');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const sessionRoutes = require('./routes/sessions');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/api', authRoutes);
app.use('/api', eventRoutes);
app.use('/api', sessionRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

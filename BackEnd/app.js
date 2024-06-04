const express = require('express');
const cors = require('cors');
const PORT =  5000;
const app = express();
const clientRoutes=require('./routes/clientRoutes')
const adminRoutes=require('./routes/adminRoutes')
const sellerRoutes=require("./routes/sellerRoutes")



app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/Seller',sellerRoutes)
app.use('/Client',clientRoutes);
app.use('/Admin',adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

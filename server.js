const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3001;

const uri = 'mongodb+srv://aaaa:aaaa@atlascluster.8zc3jdx.mongodb.net/Customers?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true';

let client;

async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
  }
}

app.use(cors());
app.use(express.json());

app.get('/customers', async (req, res) => {
  try {
    await connectToMongoDB();
    const database = client.db('Customers');
    const customers = database.collection('Customers');
    const data = await customers.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Błąd podczas pobierania danych graczy:', error);
    res.status(500).json({ error: 'Błąd podczas pobierania danych graczy', details: error.message });
  }
});

app.post('/customers', async (req, res) => {
  try {
    await connectToMongoDB();
    const database = client.db('Customers');
    const customers = database.collection('Customers');
    const newCustomer = {
      name: req.body.name,
      industry: req.body.industry,
    };
    const result = await customers.insertOne(newCustomer);
    res.json(result);
  } catch (error) {
    console.error('Błąd podczas dodawania nowego gracza:', error);
    res.status(500).json({ error: 'Błąd podczas dodawania nowego gracza', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});

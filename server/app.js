const cors = require('cors');
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.use(cors());

async function getCustomers(req, res) {
    const mongoClient = new MongoClient('mongodb+srv://admin:ggEbibpZzIMwyiog@cluster0.mflu0us.mongodb.net/Customers?retryWrites=true&w=majority');
    try {
        await mongoClient.connect();
        const database = mongoClient.db('Customers');
        const customers = database.collection('Customers');
        const data = await customers.find({}).toArray();

        res.status(200).json(data);
    } catch (error) {
        console.error('Błąd podczas pobierania danych klientów:', error);
        res.status(500).json({ message: 'Błąd podczas pobierania danych z bazy' });
    } finally {
        await mongoClient.close();
    }
}

const PORT = process.env.PORT || 3001;

app.get('/customers', getCustomers);

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

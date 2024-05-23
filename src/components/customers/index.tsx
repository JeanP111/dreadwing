import { MongoClient, ObjectId } from "mongodb";

export type Customer = {
  _id: ObjectId;
  name: string;
  industry: string;
};

export const mongoClient = new MongoClient('mongodb+srv://admin:ggEbibpZzIMwyiog@cluster0.mflu0us.mongodb.net/Customers?retryWrites=true&w=majority');

export async function getCustomers() {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Customers');
    const customers = database.collection('Customers');
    const data = await customers.find({}).toArray();

    console.log('Dane klientów:', data);

    await mongoClient.close();

    return {
      props: {
        customers: JSON.parse(JSON.stringify(data)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Błąd podczas pobierania danych klientów:', error);
    await mongoClient.close();
    return {
      props: {
        customers: [],
      },
    };
  }
}

import { MongoClient } from 'mongodb';

const dbName = process.env.DATABASE_NAME;
const dbUrl = process.env.DATABASE_URL;

export const client = new MongoClient(dbUrl);

// Wrapper function to manage connection open and close
const doDatabaseOperation = async (operation) => {
  let result = null;
  try {
    await client.connect();
    const db = client.db(dbName);
    result = await operation(db);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
  return result;
};

export const insertRecord = async (collectionName, data) => {
  return doDatabaseOperation(async (db) => {
    if (Array.isArray(data)) {
      return db.collection(collectionName).insertMany(data);
    } else {
      return db.collection(collectionName).insertOne(data);
    }
  });
};

export const updateRecord = async (collectionName, filter, data) => {
  return doDatabaseOperation(async (db) => {
    return db.collection(collectionName).updateMany(filter, data);
  });
};

export const deleteRecord = async (collectionName, query) => {
  return doDatabaseOperation(async (db) => {
    db.collection(collectionName).deleteMany(query);
  });
};

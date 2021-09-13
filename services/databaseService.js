import { MongoClient, ObjectId } from 'mongodb';
import mongoDotNotation from 'mongo-dot-notation';

const dbName = process.env.DATABASE_NAME;
const dbUrl = process.env.DATABASE_URL;

export const client = new MongoClient(dbUrl);

// Wrapper function to manage connection open and close
const doDatabaseOperation = async (operation) => {
  let result = null;
  try {
    await client.connect();
    result = await operation(client.db(dbName));
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

export const replaceRecord = async (collectionName, filter, data) => {
  return doDatabaseOperation((db) => {
    filter = filterModify(filter);
    return db.collection(collectionName).replaceOne(filter, data);
  });
};

export const updateRecord = async (collectionName, filter, data) => {
  return doDatabaseOperation(async (db) => {
    filter = filterModify(filter);
    data = mongoDotNotation.flatten(data);
    return db.collection(collectionName).updateMany(filter, data);
  });
};

export const deleteRecord = async (collectionName, filter) => {
  return doDatabaseOperation(async (db) => {
    filter = filterModify(filter);
    db.collection(collectionName).deleteMany(filter);
  });
};

const filterModify = (filter) => {
  if (filter._id) {
    filter._id = ObjectId(filter._id);
  }
  return filter;
};

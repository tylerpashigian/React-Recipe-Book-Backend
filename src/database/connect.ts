import { MongoClient } from 'mongodb';
const Db = process.env.ATLAS_URI ?? '';
const client = new MongoClient(Db, {});

var _db: any;

export const connectToServer = (callback: any) => {
  client.connect((err: any, db: any) => {
    if (db) {
      _db = db.db('recipe_book');
      console.log('Successfully connected to MongoDB.');
    }
    return callback(err);
  });
};

export const getDb = () => {
  return _db;
};

export default client;

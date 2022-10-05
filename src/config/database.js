import mongoose from 'mongoose';
import config from './config.js';

const db = mongoose.connection;

db.on('connecting', () => {
  console.log('Trying to conect to DB');
});

db.on('connected', () => {
  console.log('You have connected to DB');
});

db.on('error', () => {
  console.log('Error in connection to DB');
});

export default async () => {
  await mongoose.connect(config.db);
};
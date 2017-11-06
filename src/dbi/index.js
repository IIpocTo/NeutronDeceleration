const sqlite3 = require('sqlite3').verbose();
import init from './init';
import {validatePassword, getUser} from './auth';

const db = new sqlite3.Database(':memory:');

const getDb = () => db;

export default {
  getDb,
  init,
  validatePassword,
  getUser
};
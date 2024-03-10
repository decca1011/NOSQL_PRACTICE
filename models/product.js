const mongodb = require('mongodb');
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, imageUrl, price, description, id) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // Update existing product
      dbOperation = db.collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // Insert new product
      dbOperation = db.collection('products').insertOne(this);
    }
    return dbOperation.then(result => {
      console.log('Product saved');
    })
    .catch(err => {
      console.log('Error saving product:', err);
      throw err; // Propagate the error to the caller
    });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
        throw err; // Propagate the error to the caller
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
        throw err; // Propagate the error to the caller
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({'_id': new mongodb.ObjectId(prodId)})
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.error(err);
        throw err; // Propagate the error to the caller
      });
  }
}

module.exports = Product;

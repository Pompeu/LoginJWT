const Bluebird = require("bluebird");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports.connect = () => {
  const mongooseOpts = {
    useMongoClient: true,
  };

  mongoose.Promise = Bluebird;
  return MongoMemoryServer.create()
    .then((mongo) => mongo.getUri())
    .then((uri) => {
      if (process.env.NODE_ENV !== "testing") {
        return mongoose.connect("mongodb://localhost/test");
      }

      return mongoose.connect(uri, mongooseOpts);
    });
};

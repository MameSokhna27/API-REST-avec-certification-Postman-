const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connecté à la base de données');
    })
    .catch(err => {
      console.error('Erreur de connexion à la base de données:', err);
    });
const express = require('express');
require('dotenv').config();  

const app = express();
require('./dbconfig/dbconfig')
const User = require('./models/User')

app.get('/users', async (req, res) => {
  try {
           let users = await User.find();
           res.status(200).send(users);
  } catch (error) {
    res.status(400).send({err : error});
  }  
  });


app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Route DELETE : supprimer un utilisateur par ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      await user.remove();
      res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
app.listen(3000, ()=>{
  console.log("server started at http://localhost:3000")
})

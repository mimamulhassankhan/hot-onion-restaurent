const express = require('express');
const { MongoClient, ObjectID } = require('mongodb'); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();




const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tviz5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const restaurantCollections = client.db("hot-onion-restaurant-ltd").collection("restaurants");
  const orderCollection = client.db("hot-onion-restaurant-ltd").collection("orders");
  
  app.post('/addRestaurant', (req, res) => {
    const restaurantInfo = req.body;
    console.log(restaurantInfo);
    restaurantCollections.insertOne(restaurantInfo)
    .then((result) => {
        if(result.insertedCount > 0){
            res.send(result.ops[0]);
        }
        else{
            res.send({"status": "success","message": `<p className="text-success">Data inserted!</p>`})
        }
    })
})

  app.post('/addOrder', (req, res) => {
    const order = req.body;
    orderCollection.insertOne(order)
    .then((result) => {
        res.send(result.insertedCount > 0);
    })
})

  app.get('/getRestaurants', (req, res) => {
    restaurantCollections.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.post('/selectedProduct', (req, res) => {
      const productKeys = req.body;
      productCollection.find({key: {$in: productKeys}})
      .toArray((err, documents) => {
          res.send(documents);
      })
  })

  app.get('/restaurant/:r_Id', (req, res) => {
    restaurantCollections.find({_id: new ObjectID(req.params.r_Id)})
    .toArray((err, documents) => {
        res.send(documents[0]);
    })
})

});

app.get('/', (req, res) => {
  res.send('Restaurant Management Server');
})



app.listen(process.env.PORT || 5000);
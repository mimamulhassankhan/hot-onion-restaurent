const express = require('express');
const multer = require('multer');
const { MongoClient, ObjectID } = require('mongodb');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
      callback(null, 'uploads')
  },
  filename: (req, file, callback) =>{
      callback(null, file.fieldname+path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const restaurantCollections = client.db(`${process.env.DB_NAME}`).collection("restaurants");
  const orderCollection = client.db(`${process.env.DB_NAME}`).collection("orders");
  const foodCollection = client.db(`${process.env.DB_NAME}`).collection("foodItems");
  const userCollection = client.db(`${process.env.DB_NAME}`).collection("allUsers");
  const supplierCollection = client.db(`${process.env.DB_NAME}`).collection("suppliers");

  app.post('/addRestaurant', (req, res) => {
    const restaurantInfo = req.body;
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

  app.post('/addSupplyPerson', (req, res) => {
    const supplierInfo = req.body;
    supplierCollection.insertOne(supplierInfo)
    .then((result) => {
        if(result.insertedCount > 0){
            res.send(result.ops[0]);
        }
        else{
            res.send({"status": "error","message": `<p className="text-danger">Data not-inserted!</p>`})
        }
    })
  })

app.post('/writeSingleUser', (req, res) => {
    const userInfo = req.body;
    userCollection.insertOne(userInfo)
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
      if(result.insertedCount > 0){
        res.send(result.ops[0]);
      }
      else{
        res.send({"status": "error","message": `<p className="text-danger">Data not inserted!</p>`})
      }
    })
  })

  app.post('/writeFood', upload.single('foodImages'), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path).catch(cloudError => console.log(cloudError));
    if(result){
        const foodData = {...req.body, foodImage1: result.secure_url};  
        foodCollection.insertOne(foodData)
        .then(result => {
            if(result.insertedCount < 0){
                res.send({"status": "error","message": `<p className="text-danger">Data corrupted</p>`})
            }
            else{
                res.send(result.ops[0]);
            }
        })
        .catch(dbError => console.log(dbError));
    }
    else{
        res.status(404).send('Upload Failed');
    }
  })

  app.get('/getRestaurants', (req, res) => {
    restaurantCollections.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get('/getAllFoods', (req, res) => {
    foodCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get('/getAllUsers', (req, res) => {
    userCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get('/getAllSuppliers', (req, res) => {
    supplierCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get('/getAllOrders', (req, res) => {
    orderCollection.find({})
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

  app.patch('/updateUser/:u_Id', (req, res) => {
    userCollection.updateOne({_id : ObjectID(req.params.u_Id)},
    {
        $set:{ userShippingAddress: req.body}
    })
    .then(result => {
      res.send(result.modifiedCount > 0);
    });
  });

  app.patch('/updateOrderInfo/:o_Id', (req, res) => {
    orderCollection.updateOne({_id : ObjectID(req.params.o_Id)},
    {
        $set:{ orderStatus: req.body.orderStatus}
    })
    .then(result => {
      res.send(result.modifiedCount > 0);
    });
  });

  app.delete('/deleteFood/:f_Id', (req, res) => {
    foodCollection.deleteOne({_id : ObjectID(req.params.f_Id)})
    .then(result =>{
      res.send(result.deletedCount > 0);
    })
  });

  app.patch('/updateFoodInfo/:f_Id', (req, res) => {
    foodCollection.updateOne({_id : ObjectID(req.params.f_Id)},
    {
        $set:{ foodName: req.body.foodName, foodShortDescription: req.body.foodShortDescription, foodLongDescription: req.body.foodLongDescription, foodPrice: req.body.foodPrice}
    })
    .then(result => {
      res.send(result.modifiedCount > 0);
    });
  });

  app.delete('/deleteOrder/:o_Id', (req, res) => {
    orderCollection.deleteOne({_id : ObjectID(req.params.o_Id)})
    .then(result =>{
      res.send(result.deletedCount > 0);
    })
  });

});

app.get('/', (req, res) => {
  res.send('Restaurant Management Server');
})



app.listen(process.env.PORT || 5000);
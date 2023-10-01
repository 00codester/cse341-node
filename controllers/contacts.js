const mongodb = require('../db/connection.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async(req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result= await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .find({_id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

//fname, lname, birthdayIn, emailIn, favColor
const postContact = async(req, res) => {
    //const userId = new ObjectId(fname, lname, birthdayIn, email, favColor);
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    // const myDB = client.db();
    // const myColl = myDB.collection('contacts');
    // //birthday: birthdayIn, email: emailIn, favoriteColor: favColor, firstName: fname, lastName: lname
    // const doc = { birthday: "12/21/18", email: "gohome@gmail.com", favoriteColor: "Violet", firstName: "Cory", lastName: "Karl" };
    // const result = await myColl.insertOne(doc);
    // console.log(
    //    `A document was inserted with the _id: ${result.insertedId}`,
    // );
    const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
    if(result.acknowledged){
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'Error occured while creating contact');
    }
};
const updateContact = async(req, res) =>{
    const userId = new ObjectId(req.params.id);
    
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({_id: userId}, contact);
    console.log(result);
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured while creating contact');
    }

};

const deleteContact = async(req, res) =>{
    const userId = new ObjectId(req.params.id);
    
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id: userId}, true);
    console.log(result);
    if(result.deletedCount > 0){
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Error occured while creating contact');
    }

};

module.exports = { 
    getAll, 
    getSingle, 
    postContact, 
    updateContact, 
    deleteContact 
};
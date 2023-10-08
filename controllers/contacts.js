const mongodb = require('../db/connection.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('contacts').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async(req, res) => {
    try {
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
    } catch(err){
        res.status(500).json({ err });
    }
};

const postContact = async(req, res) => {
    try {
        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);
        if(result.acknowledged){
            res.status(201).json(result);
        } else {
            res.status(500).json(response.error || 'Error occured while creating contact');
        }
    } catch(err){
        res.status(500).json({ err });
    }
};
const updateContact = async(req, res) =>{
    try {
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
    } catch(err){
        res.status(500).json({ err });
    }
};

const deleteContact = async(req, res) =>{
    try {
        const userId = new ObjectId(req.params.id);
        
        const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id: userId}, true);
        console.log(result);
        if(result.deletedCount > 0){
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Error occured while creating contact');
        }
    } catch(err){
        res.status(500).json({ err });
    }
};

module.exports = { 
    getAll, 
    getSingle, 
    postContact, 
    updateContact, 
    deleteContact 
};
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import { getDb } from '../database/connect';
import { ObjectId } from 'mongodb';
import { Recipe } from '../models/Recipe';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const dbConnect = getDb();
  dbConnect
    .collection('recipes')
    .find({})
    .limit(20)
    .toArray((err: any, result: any) => {
      if (err) {
        res.status(400).send('Error fetching recipes!');
      } else {
        const recipes = result.map((recipe: Recipe) => {
          return { _id: recipe._id, name: recipe.name };
        });
        res.json(recipes);
      }
    });
});

router.route('/recipe/:id').get(function (req, res) {
  const dbConnect = getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  dbConnect
    .collection('recipes')
    .findOne(myquery, function (err: any, result: any) {
      if (err) throw err;
      res.json(result);
    });
});

router.route('/recipe/add').post(async (req, res) => {
  const dbConnect = getDb();
  dbConnect
    .collection('recipes')
    .insertOne(req.body, function (err: any, result: any) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json({ id: result.insertedId, ...req.body });
      }
    });
});

router.route('/recipe/:id').put(function (req, res) {
  const dbConnect = getDb();
  const myQuery = { _id: new ObjectId(req.params.id) };
  const body = {
    name: req.body.name,
    description: req.body.description,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
  };
  let newValues = {
    $set: { ...body },
  };
  dbConnect
    .collection('recipes')
    .updateOne(myQuery, newValues, function (err: any, result: any) {
      if (err) {
        res.status(400).send('Error updating recipe!');
      } else {
        res.json({ id: req.params.id, ...body });
      }
    });
});

router.route('/recipe/:id').delete((req, res) => {
  const dbConnect = getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  dbConnect
    .collection('recipes')
    .deleteOne(myquery, function (err: any, result: any) {
      if (err) {
        res.status(400).send('Error deleting recipe!');
      } else {
        res.json(result);
      }
    });
});

export default router;

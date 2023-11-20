// controllers/imageController.js
const express = require('express');
const Image = require('../models/Image');
const router = express.Router();

// Display form to upload image
router.get('/', async (req, res) => {
  try {
    const images = await Image.findAll();
    res.render('index', { images, image: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Process form submission
router.post('/upload', async (req, res) => {
    const { link, description } = req.body;
  
    try {
      const newImage = await Image.create({ link, description });
      const images = await Image.findAll();
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.post('/comment/:id', async (req, res) => {
  const { comment } = req.body;
  const imageId = req.params.id;

  try {
    const image = await Image.findByPk(imageId);
    if (image) {
      // Append the new comment to existing comments
      image.comments = image.comments ? `${image.comments}\n${comment}` : comment;
      await image.save();

      // Redirect back to the home page after adding a comment
      res.redirect('/');
    } else {
      res.status(404).send('Image not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const Gallery = require('./models/Gallery');
const Blog = require('./models/Blog');
const Article = require('./models/Article');
const User = require('./models/User');

const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req,res)=>{
 res.render("index");
});

// ---------------------------------------GALLERY ROUTES-----------------------------------------------

// @route    GET api/gallery
// @desc     View all images
// @access   Public
app.get('/gallery', async (req, res) => {
    try {
      res.render("gallery");
      // const images = await Gallery.find().sort({ date: -1 });
      // res.json(images);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route    POST api/gallery/new
// @desc     Add an image
// @access   Public for now
app.post(
    '/gallery/new',
    async (req, res) => {
      try { 
        const newImage = new Gallery({
          image: req.body.image,
          caption: req.body.caption,
          name: req.body.name,
        });
  
        const gallery = await newImage.save();
  
        res.json(gallery);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

//   -----------------------------ARTICLE ROUTES--------------------------------------

// @route    GET api/articles
// @desc     View all news articles
// @access   Public
app.get('/articles', async (req, res) => {
    try {
      const articles = await Article.find().sort({ date: -1 });
      res.render("articles",{articles : articles});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/articles/:id
// @desc     View particular article
// @access   Public
app.get("/articles/:id", async(req,res) =>{
  try {
    const article = await Article.findById(req.params.id);
    res.render("article", {article : article});
  } catch {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/article/new
// @desc     Add a news article
// @access   Public for now
app.post(
    '/article/new',
    async (req, res) => {
      try { 
        const newArticle = new Article({
          title: req.body.title,
          text: req.body.text,
          image: req.body.image,
          name: req.body.name,
        });
  
        const article = await newArticle.save();
  
        res.json(article);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// ---------------------------------------BLOG ROUTES-----------------------------------------------
// @route    GET api/blogs
// @desc     View all blogs
// @access   Public
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST api/blog/new
// @desc     Add a blog
// @access   Public for now

app.post(
  '/blog/new',
  async (req, res) => {
    try { 
      const newBlog = new Blog({
        title: req.body.title,
        text: req.body.text,
        name: req.body.name,
        image: req.body.image
      });

      const blog = await newBlog.save();

      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server Has Started!');
});


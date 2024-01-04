const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET/
 * HOME
 */


// Routes
router.get('', async (req, res) => {
    

    try {
        const locals ={
            title: "Blog Fernel",
            description: "Un blog creado con NodeJS, Express y Mongo."
        }

        let perPage = 6;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.find().count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }
    
});

/*router.get('', async (req, res) => {
    const locals ={
        title: "Blog Fernel",
        description: "Un blog creado con NodeJS, Express y Mongo."
    }

    try {
        const data = await Post.find();
        res.render('index', {locals, data});
    } catch (error) {
        console.log(error)
    }
    
});*/

/**
 * GET/
 * Post: id
 */

router.get('/post/:id', async (req, res) => {
    
    try {

        

        let slug = req.params.id;

        
        const data = await Post.findById({ _id: slug});

        const locals ={
            title: data.title,
            description: "Un blog creado con NodeJS, Express y Mongo.",
            currentRoute: `/post/${slug}`
        }

        res.render('post', {locals, data});
    } catch (error) {
        console.log(error)
    }
    
});


/**
 * GET/
 * Post: search
 */

router.post('/search', async (req, res) => {
    

    try {
        const locals ={
            title: "Blog Fernel",
            description: "Un blog creado con NodeJS, Express y Mongo."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-z0-9]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i')}},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        });
        res.render("search", {
            data,
            locals
        });
    } catch (error) {
        console.log(error)
    }
    
});

/*function insertPostData() {
    Post.insertMany([
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
        {
            title: "Building a Blog",
            body: "this is the body text"
        },
    ])
}
insertPostData();*/




router.get('/about', (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        currentRoute: '/contact'
    });
});

module.exports = router;
// branchController.js
import { db } from "../models/index.js";

const Article = db.Articles;



// 1. Create new Article
const addArticle = async (req, res) => {
    let info = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        body: req.body.body
        
    };
    
    try {
        
      
        const article = await Article.create(info);
        res.status(200).send(article);
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).send(error.message);
    }
};



// 2. get all Article
const getAllArticles = async (req, res) => {
    let article = await Article.findAll({});
    res.status(200).send(article);
}

// 3. get single Article
const getOneArticle = async (req, res) => {
    let id = req.params.id;
    let article = await Article.findOne({ where: { id: id } });
    res.status(200).send(article);
}

// 4. update Article
const updateArticle = async (req, res) => {
    
    let id = req.params.id;
    const article = await Article.update(req.body, { where: { id: id } });
    res.status(200).send(article);
}

// 5. delete Article
const deleteArticle = async (req, res) => {
    let id = req.params.id;
    await Article.destroy({ where: { id: id } });
    res.status(200).send('Article deleted');
}

export {
    addArticle,
    getAllArticles,
    getOneArticle,
    updateArticle,
    deleteArticle
};
// RoleRoute.js
import {
    addArticle,
    getAllArticles,
    getOneArticle,
    updateArticle,
    deleteArticle
} from '../controllers/articleController.js';
import { Router } from 'express';

const router = Router();

router.post('/article', addArticle);
router.get('/article', getAllArticles);
router.get('/article/:id', getOneArticle);
router.put('/article/:id', updateArticle);
router.delete('/article/:id', deleteArticle);



export default router;
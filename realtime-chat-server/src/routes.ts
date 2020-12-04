import express from 'express';

const router: express.Router = express.Router();

router.get('/', (req, res) => {
    res.send('App is running');
});

export default router;
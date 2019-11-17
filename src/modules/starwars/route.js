import { Router } from 'express';

import controller from './controller';

const starWarsController = controller({});

const router = Router();
router.get('/starships/:id', starWarsController.checkCacheMiddleWare, starWarsController.getSWElement);

export default router;

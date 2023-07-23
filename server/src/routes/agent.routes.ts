import { Router } from 'express';
import { createAgent, updateAgentProfile } from '../controllers/agent';
import { isAgent } from '../middleware/isAgent';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router
  .route('/')
  .post(isAuth, createAgent)
  .put(isAuth, isAgent, updateAgentProfile);

export default router;

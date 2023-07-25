import { Router } from "express"
import itemControllers from "../controllers/item.controllers.js"
const router = Router()

router.post('/add', authenticateToken, (req, res) => itemControllers.add(req, res))
router.put('/edit', authenticateToken, (req, res) => itemControllers.edit(req, res))
router.delete('/delete', authenticateToken, (req, res) => itemControllers.delete(req, res))

router.get('/all', (req, res) => itemControllers.findAll(req, res))
router.get('/:itemId', (req, res) => itemControllers.itemDetail(req, res))

export default router
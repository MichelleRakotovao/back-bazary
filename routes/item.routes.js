import { Router } from "express"
import ItemController from "../controllers/item.Controllers.js"
import authenticateToken from '../middleware/authenticateToken.js'
const router = Router()

router.post('/add', authenticateToken, (req, res) => ItemController.add(req, res))
router.put('/edit', authenticateToken, (req, res) => ItemController.edit(req, res))
router.delete('/delete', authenticateToken, (req, res) =>ItemController.delete(req, res))

router.get('/all', (req, res) => ItemController.findAll(req, res))
router.get('/:itemId', (req, res) =>ItemController.itemDetail(req, res))

export default router
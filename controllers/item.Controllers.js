import ResponseFormat from "../utils/response.js"
import deleteSpace from "../utils/deleteSpace.js"
import decodeToken from "../utils/decodeToken.js"
import ItemService from "../services/item.service.js"

export default class ItemController {

    static add = async (req, res) => {
        let { name, price, picturesUrls, count, category, subCategory, Number, color } = req.body
        const { authorization } = req.headers

        name = deleteSpace(name)
        category = deleteSpace(category)
        subCategory = deleteSpace(subCategory)
        if (name && price && picturesUrls && count && category && subCategory && Number) {
            const itemProperty = {
                name,
                price,
                picturesUrls,
                count,
                type: {
                    category,
                    subCategory
                },
                Number,
                color,
                seller: decodeToken(authorization)
            }
            const data = await ItemService.add(itemProperty)
            res.status(data.code).send(data)
        } else res.status(401).send(new ResponseFormat(401, 'FAILURE', {}, 'Veuillez verifier les champs "name, price, picturesUrls, count, category, subCategory, Number, color*" '))
    }

    static itemDetail = async (req, res) => {
        const data = await ItemService.itemDetail(req.params.itemId)
        res.status(data.code).send(data)
    }
    static findAll = async (req, res) => {
        const data = await ItemService.findAll()
        res.status(data.code).send(data)
    }

    static edit = async (req, res) => {
        let { name, price, picturesUrls, count, category, subCategory, Number, color, itemID } = req.body
        const { authorization } = req.headers

        name = deleteSpace(name)
        category = deleteSpace(category)
        subCategory = deleteSpace(subCategory)
        if (name && price && picturesUrls && count && category && subCategory && Number && itemID) {
            const itemProperty = {
                name,
                price,
                picturesUrls,
                count,
                type: {
                    category,
                    subCategory
                },
                Number,
                color,
                seller: decodeToken(authorization)
            }
            const data = await ItemService.edit(itemProperty, itemID)
            res.status(data.code).send(data)
        } else res.status(401).send(new ResponseFormat(401, 'FAILURE', {}, 'Veuillez verifier les champs "name, itemID, price, picturesUrls, count, category, subCategory, Number, color*" '))
    }

    static delete = async (req, res) => {
        let { itemID } = req.body
        const { authorization } = req.headers
        if (itemID) {
            const data = await ItemService.edit(itemProperty, itemID)
            res.status(data.code).send(data)
        } else res.status(401).send(new ResponseFormat(401, 'FAILURE', {}, 'Veuillez verifier le champs "itemID" '))
    }

}

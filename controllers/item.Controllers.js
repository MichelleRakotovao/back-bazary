import ResponseFormat from "../utils/response.js"
import decodeToken from "../utils/decodeToken.js"
import ItemService from "../services/item.service.js"
import deleteSpace from "../utils/deleteSpace.js"

export default class ItemController {

    static add = async (req, res) => {
        let { name, price, picturesUrls, category, subCategory, quantity, color } = req.body
        const { authorization } = req.headers
        name = deleteSpace(name)
        category = deleteSpace(category)
        subCategory = deleteSpace(subCategory)
        if (name) {
            if (price) {
                if (picturesUrls) {
                    if (category && subCategory) {
                        if (quantity) {
                            if (color) {
                                const itemProperty = {
                                    name,
                                    price,
                                    picturesUrls,
                                    type: {
                                        category,
                                        subCategory
                                    },
                                    quantity,
                                    color,
                                    seller: decodeToken(authorization)
                                }
                                const data = await ItemService.add(itemProperty)
                                res.status(data.code).send(data)
                            } else res.status(401).send(new ResponseFormat(401, "FAILURE", {}, `quelles sont les couleurs disponibles?`))
                        } else res.status(401).send(new ResponseFormat(401, "FAILURE", {}, `Quelle est la quantité?`))
                    } else res.status(401).send(new ResponseFormat(401, "FAILURE", {}, `Veuillez remplir la Catégorie et la  sous-catégorie!`))
                } else res.status(401).send(new ResponseFormat(401, "FAILURE", {}, `URL des photos requis!`))
            } else res.status(401).send(new ResponseFormat(401, "FAILURE", {}, `Le prix del'article est requis!`))
        } else res.status(401).send(new ResponseFormat(401, 'FAILURE', {}, `Veuillez remplir le nom de l'article!`))
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

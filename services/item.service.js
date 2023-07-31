import ItemModel from "../models/item.model.js"
import SellerModel from "../models/seller.model.js"
import ResponseFormat from "../utils/response.js"

import decodeToken from "../utils/decodeToken.js"
export default class ItemService {
    static add = async (itemProperty) => {
        const seller = await SellerModel.findById(sellerID)
        if (seller) {
            const newItem = new ItemModel(itemProperty)
            await newItem.save()
            return new ResponseFormat(200, 'SUCCESS', { item: newItem.id }, `Votre article a été ajouté avec succès`)
        } else return new ResponseFormat(403, 'FAILURE', {}, `Vous devez vous faire verifier en tant que vendeur pour pouvoir vendre des articles`)
    }

    static itemDetail = async (itemId) => {
        const item = await ItemModel.findById(itemId).populate({
            path: 'seller',
            populate: { path: 'user' }
        })
        if (item) {
            return new ResponseFormat(200, 'SUCCESS', { item }, `Les details de l'article`)
        } else return new ResponseFormat(404, 'FAILURE', {}, `Cet article est introuvable`)
    }

    static findAll = async () => {
        const items = await ItemModel.find()
        if (items) {
            return new ResponseFormat(200, 'SUCCESS', items, `Tout les articles`)
        } else return new ResponseFormat(404, 'FAILURE', {}, `Cet article est introuvable`)
    }

    static edit = async (itemProperty, itemID) => {
        const item = await ItemModel.findById(itemID)
        if (item) {
            const seller = await SellerModel.findById(item.seller)
            if (seller) {
                if (itemProperty.sellerID == item.seller) {
                    await ItemModel.findByIdAndUpdate(itemID, { itemProperty })
                    return new ResponseFormat(200, 'SUCCESS', {}, `Votre article a été modifié avec succès`)
                } else return new ResponseFormat(401, 'FAILURE', {}, `Vous ne pouvez pas modifier un article qui n'est pas le votre`)
            } else return new ResponseFormat(403, 'FAILURE', {}, `Cet utilisateur n'est plus enregistré dans Bazary`)
        } else return new ResponseFormat(404, 'FAILURE', {}, `L'article n'est plus disponnible`)
    }

    static delete = async (itemID, sellerID) => {
        const item = await ItemModel.findById(itemID)
        if (item) {
            const seller = await SellerModel.findById(item.seller)
            if (seller) {
                if (sellerID == item.seller) {
                    await ItemModel.findByIdAndDelete(itemID)
                    return new ResponseFormat(200, 'SUCCESS', {}, `Votre article a été supprimé avec succès`)
                } else return new ResponseFormat(401, 'FAILURE', {}, `Vous ne pouvez pas supprimer un article qui n'est pas le votre`)
            } else return new ResponseFormat(403, 'FAILURE', {}, `Cet utilisateur n'est plus enregistré dans Bazary`)
        } else return new ResponseFormat(404, 'FAILURE', {}, `L'article a déjà été supprimé`)
    }
}
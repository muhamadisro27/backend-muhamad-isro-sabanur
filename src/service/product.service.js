import {
    prismaClient
} from "../app/database.js"


const getAllProducts = async () => {
    return prismaClient.product.findMany({
        select: {
            id: true,
            name: true,
            price: true
        }
    })
}

export default {
    getAllProducts
}
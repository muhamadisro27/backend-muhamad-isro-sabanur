import {
    prismaClient
} from "../src/app/database"
import bcrypt from "bcrypt"

const createUserMerchant = async () => {
    await prismaClient.user.create({
        data: {
            name: "merchant-1",
            email: "merchant1@example.com",
            password: await bcrypt.hash("rahasia", 10),
            role: "MERCHANT"
        }
    })
}

const getUserMerchant = async () => {
    return prismaClient.user.findFirst({
        where: {
            role: "MERCHANT",
        }
    })
}

const createProductByMerchant = async () => {
    const getUserMerchant = await getUserMerchant();

    return prismaClient.product.create({
        data: {
            name: "Product 1",
            price: 1500000,
            merchantId: getUserMerchant.id
        }
    })
}

const removeAllProducts = async () => {
    return prismaClient.product.deleteMany()
}

const removeAllUsers = async () => {
    return prismaClient.user.deleteMany()
}

export {
    createProductByMerchant,
    createUserMerchant,
    getUserMerchant,
    removeAllProducts,
    removeAllUsers
}
import supertest from "supertest"
import {
    createProductByMerchant,
    createUserMerchant,
    removeAllProducts,
    getUserMerchant,
    removeAllUsers
} from "./test-util.js"

describe("GET /api/products", () => {
    beforeEach(async () => {
        await createUserMerchant()
        await createProductByMerchant()
    })

    afterEach(async () => {
        await removeAllProducts()
        await removeAllUsers()
    })

    it("should return a list of products", async () => {

        const result = await supertest(web).get("/api/products")

        expect(result.status).toBe(200)
        expect(result.body.data).toBeDefined();
    })
})
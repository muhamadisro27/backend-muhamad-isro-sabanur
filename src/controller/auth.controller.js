import authService from "../service/auth.service.js";

export const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        return res.header('Authorization', result.token)
            .status(200).json({
                data: result
            })
    } catch (error) {
        next(error)
    }
}
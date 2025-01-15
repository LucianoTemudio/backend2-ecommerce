import { userDao } from "../mongodb/user.dao.js";
import UserResDTO from "../dto/user/user.res.dto.js";

class UserRepository {

    getPrivateData(obj){
        try {
            const userDTO = new UserResDTO(obj)
            return userDTO
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const userRepository = new UserRepository();
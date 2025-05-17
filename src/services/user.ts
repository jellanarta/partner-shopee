import { typeLogin } from "@/app/Login/components/loginBar";
import { typeRegister } from "@/app/register/components/registerBar";
import axios from "axios";

export class UserService {
    static async createUser(datauser: typeRegister) {
        try {
            return await axios.post("/api/user",{...datauser,action:"create"});
        } catch (error) {
            return error;
        }
    }

    static async loginUser(datauser: typeLogin) {
        try {
            return await axios.post("/api/user",{...datauser,action:"login"});
        } catch (error) {
            return error;
        }
    }
}


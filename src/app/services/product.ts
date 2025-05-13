import axios from "axios";
axios.defaults.withCredentials=true
export async function getProduct(keyName:string){
    try {
        return await axios.get('/api/product?name='+keyName)
    } catch (error:any) {
        return error
    }
}
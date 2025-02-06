import { toast } from "react-toastify";
import { http } from "../../services/base"
import { environment } from "../../environment";

export const usersGetService = async <T = any>(attr: { gender?: 'female' | 'male' | '', results?: number, nat: string | string }) => {
    try {
        const r: T = await http(environment.userEndpoint).get('', attr);
        return r;
    } catch (error: any) {
        toast.error(error.message);
    }
}
import { toast } from "react-toastify";
import { http } from "../../services/base"
import { environment } from "../../environment";

interface IInfo {
    seed: string;
    results: number;
    page: number;
    version: string;
}

interface IResponse<T = any> {
    results: T;
    info: IInfo;
    error?: string;
}

export const usersGetService = async <T = any>(attr: { gender?: 'female' | 'male' | '', results?: number, nat: string | string }) => {
    try {
        const r = await http(environment.userEndpoint).get<IResponse<T>>('', attr);
        if(r.error)
            throw new Error(r.error);
        return r;
    } catch (error: any) {
        toast.error(error.message);
    }
}
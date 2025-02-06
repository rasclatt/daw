import { environment } from "../environment";

type IHttpClient = {
    "Access-Control-Allow-Headers": string,
    "Access-Control-Allow-Methods": string,
    'Content-Type': string,
    Authorization?: string
}

const generateBoundary = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let boundary = '--';
  
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      boundary += chars[randomIndex];
    }
  
    return boundary + '--';
  }

export default class HttpClient
{
    public type: string = 'application/json'
    public boundry: string = generateBoundary()
    private trailing: string = ''
    private apiEndpoint: string = environment.userEndpoint
    private headers: IHttpClient = {
        "Access-Control-Allow-Headers": [
            "Content-Type",
            "Access-Control-Allow-Headers",
            "Authorization",
            "X-Requested-With",
            "Access-Control-Allow-Methods"
        ].join(','),
        "Access-Control-Allow-Methods": [
            'POST',
            'GET',
            'PATCH',
            'PUT',
            'DELETE',
            'OPTION'
        ].join(','),
        'Content-Type': this.type
    }

    constructor(apiEndpoint?: string)
    {
        if(apiEndpoint) {
            this.apiEndpoint = apiEndpoint
            this.trailing = '/'
        }
    }
    public setContentType(t: string)
    {
        this.headers['Content-Type'] = t
        return this
    }
    public setTrailing(t: string)
    {
        this.trailing = t
        return this
    }

    private buildHttpQuery(body: any, key: string): string
    {
        if(typeof body === "object") {
            const queryString = []
            for (const k in body) {
                queryString.push(this.buildHttpQuery(body[k], `${key}[${k}]`))
            }
            return queryString.join('&')
        }
        return `${key}=${body}`
    }

    async get<T>(service?: string, body?: any): Promise<T>
    {
        const queryString = []
        if(body) {
            for (const k in body) {
                queryString.push(`${this.buildHttpQuery(body[k], k)}`)
            }
        }
        let resp: Promise<T | any>
        try {
            resp = await fetch(`${this.apiEndpoint}/${service}${this.trailing}${(queryString.length > 0)? `?${queryString.join('&')}` : ``}`, {
                method: 'GET',
                headers: this.headers
            }).then(response => response.json())
        } catch (Error: any) {
            resp = new Promise(function(success, error) {
                success({success: false, error: Error, code: 500})
                error({success: false, error: Error, code: 500})
            })
        }

        return resp
    }

    async delete<T>(service: string, body: any = {}): Promise<T>
    {
        
        let resp: Promise<T | any>
        try {
            return fetch(`${this.apiEndpoint}/${service}${this.trailing}`, {
                method: 'DELETE',
                body: JSON.stringify(body),
                headers: this.headers
            }).then(response => response.json())
        } catch (Error) {
            resp = new Promise(function(success, error) {
                success({success: false, error: Error, code: 500})
                error({success: false, error: Error, code: 500})
            })
        }

        return resp
    }

    async post<T>(service: string, body?: any): Promise<T>
    {
        
        let resp: Promise<T | any>
        try {
        return await fetch(`${this.apiEndpoint}/${service}${this.trailing}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(response => response.json())
    } catch (Error) {

        resp = new Promise(function(success, error) {
            success({success: false, error: Error, code: 500})
            error({success: false, error: Error, code: 500})
        })
    }

    return resp
    }

    async patch<T>(service?: string, body?: any): Promise<T>
    {
        
        let resp: Promise<T | any>
        try {
        return await fetch(`${this.apiEndpoint}/${service}${this.trailing}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(response => response.json())
    } catch (Error) {
        resp = new Promise(function(success, error) {
            success({success: false, error: Error, code: 500})
            error({success: false, error: Error, code: 500})
        })
    }

    return resp
    }

    static init(): HttpClient
    {
        return new HttpClient()
    }

    upload(service: string, body: FormData): Promise<Response>
    {
        return fetch(`${this.apiEndpoint}/${service}${this.trailing}`, {
            method: "POST",
            body: body,
            headers: this.headers
        })
    }
}

export const http = (endpoint?: string) => endpoint? new HttpClient(endpoint) : HttpClient.init();
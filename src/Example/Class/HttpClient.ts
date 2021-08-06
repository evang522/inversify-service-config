import {HttpClientInterface} from "../Interface/HttpClientInterface";
import {injectable} from "inversify";

@injectable()
export default class HttpClient implements HttpClientInterface
{
    public async getJson<TReturnValue>(url: string): Promise<TReturnValue>
    {
        const value = await fetch(url);

        return value.json();
    }
}

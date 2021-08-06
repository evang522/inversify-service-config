export interface HttpClientInterface
{
    getJson<TReturnValue>(url: string): Promise<TReturnValue>;
}



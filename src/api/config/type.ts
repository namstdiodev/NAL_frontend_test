export type IPaginate = {
    count?: number
    page?: number
    offset?: number
    total: number
    prev?: number
    next?: number
}

interface IServerResponse<T> {
  data: IPaginate & {
    items: T[];
  };
}
export default IServerResponse;

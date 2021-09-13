import axios from 'axios';

/**
 * @param {string}  url .addres of the requested resource
 * @return {T} returns the data from the http request
 */
export function get<T = any>(url: string): Promise<T> {
    return axios.get(url).then(({ data }) => data);
}

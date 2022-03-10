/**
 * @see axios => https://github.com/axios/axios
 */
class ApiService
{
    static apiUrl = 'http://localhost:3000/api';

    static async products()
    {
        let response = await axios.get(`${this.apiUrl}/product`);
        return response.data;
    }

    static async categories()
    {
        let response = await axios.get(`${this.apiUrl}/category`);
        return response.data;
    }
}

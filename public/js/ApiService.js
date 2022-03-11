/**
 * @see axios => https://github.com/axios/axios
 */
class ApiService
{
    static apiUrl = 'http://localhost:3000/api';

    static async products(categoryId = undefined, skip = 0, take = 12)
    {
        let filters = '';
        if(!!categoryId){
            filters = JSON.stringify({
                filters: {
                    category: {
                        value: categoryId,
                        matchMode: 'equals'
                    },
                },
            });
        }

        let response = await axios.get(`${this.apiUrl}/product?skip=${skip}&take=${take}&filters=${filters}`);
        return response.data;
    }

    static async categories()
    {
        let response = await axios.get(`${this.apiUrl}/category`);
        return response.data;
    }
}

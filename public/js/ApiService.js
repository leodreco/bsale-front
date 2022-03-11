/**
 * @see axios => https://github.com/axios/axios
 */
class ApiService
{
    apiUrl = 'http://localhost:3000/api';
    categoryId = undefined;

    setCategory(categoryId){
        this.categoryId = categoryId;
    }

    async products(skip = 0, take = 12)
    {
        let filters = '';
        if(!!this.categoryId){
            filters = JSON.stringify({
                filters: {
                    category: {
                        value: this.categoryId,
                        matchMode: 'equals'
                    },
                },
            });
        }

        let response = await axios.get(`${this.apiUrl}/product?skip=${skip}&take=${take}&filters=${filters}`);
        return response.data;
    }

    async categories()
    {
        let response = await axios.get(`${this.apiUrl}/category`);
        return response.data;
    }
}

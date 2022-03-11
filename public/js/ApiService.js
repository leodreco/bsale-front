/**
 * @see axios => https://github.com/axios/axios
 */
class ApiService
{
    apiUrl = 'http://localhost:3000/api';
    categoryId = undefined;
    filters = {};

    setCategory(categoryId){
        this.categoryId = categoryId;
    }

    setFilter(filter){
        for(let key in filter){
            this.filters[key] = filter[key];
        }
    }

    async products(skip = 0, take = 12)
    {
        let objFilters = {
            filters: {
                ...this.filters,
            },
        }
        if(!!this.categoryId){
            objFilters.filters.category = {
                value: this.categoryId,
                matchMode: 'equals',
            };
        }
        let filters = JSON.stringify(objFilters);

        let response = await axios.get(`${this.apiUrl}/product?skip=${skip}&take=${take}&filters=${filters}`);
        return response.data;
    }

    async categories()
    {
        let response = await axios.get(`${this.apiUrl}/category`);
        return response.data;
    }
}

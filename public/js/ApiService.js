/**
 * @see axios => https://github.com/axios/axios
 */
class ApiService
{
    apiUrl = 'https://leodreco-bsale-back.herokuapp.com/api';
    categoryId = undefined;
    filters = {};
    sort = {
        sortField: 'id',
        sortOrder: 'asc',
    };

    constructor(reload){
        this.reload = reload;
    }

    setCategory(categoryId){
        this.categoryId = categoryId;
        this.reload(0);
    }

    setFilter(filter){
        for(let key in filter){
            if(filter[key].value == ''){
                delete this.filters[key];
            }else{
                this.filters[key] = filter[key];
            }
        }
        this.reload(0);
    }

    setSort(field, type){
        this.sort = {
            sortField: field,
            sortOrder: type,
        };
        this.reload(0);
    }

    async products(skip = 0, take = 12)
    {
        let queryData = {
            skip,
            take,
            filters: {
                ...this.filters,
            },
            ...this.sort,
        }
        if(!!this.categoryId){
            queryData.filters.category = {
                value: this.categoryId,
                matchMode: 'equals',
            };
        }
        queryData = UrlQuerySerialize(queryData);

        let response = await axios.get(`${this.apiUrl}/product?${queryData}`);
        return response.data;
    }

    async categories()
    {
        let response = await axios.get(`${this.apiUrl}/category`);
        return response.data;
    }
}

/**
 * @see axios => https://github.com/axios/axios
 */
class ApiService
{
    static apiUrl = 'https://leodreco-bsale-back.herokuapp.com/api';

    static async products(queryData)
    {
        queryData = UrlQuerySerialize(queryData);
        try{
            return await axios.get(`${this.apiUrl}/product?${queryData}`);
        }catch(e){
            alert(e.response.data.message);
            console.error('Error en la llamada: ', e.response.data.message);
            return {
                success: false,
                data: []
            };
        }
    }

    static async categories(queryData = {})
    {
        queryData = UrlQuerySerialize(queryData);
        try{
            return await axios.get(`${this.apiUrl}/category?${queryData}`);
        }catch(e){
            alert(e.response.data.message);
            console.error('Error en la llamada: ', e.response.data.message);
            return {
                success: false,
                data: []
            };
        }
    }
}

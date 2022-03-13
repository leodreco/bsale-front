/**
 * @see axios => https://github.com/axios/axios
 */
class Filters
{
    categoryId = undefined;
    filters = {};
    sort = {
        sortField: 'id',
        sortOrder: 'asc',
    };

    constructor(reload){
        this.reload = reload;
        this.searchBar = document.querySelector('#searchBar');

        this.fieldLabel = document.querySelector('#searchContainer .dropdown.field span');
        this.typeLabel = document.querySelector('#searchContainer .dropdown.type span');
        this.searchButton = document.querySelector('#searchContainer .searchButton');

        this.searchButton.addEventListener('click', () => {
            let field = this.fieldLabel.getAttribute('value');
            let type = this.typeLabel.getAttribute('value');
            let value = this.searchBar.value;
            let filter = {};
            filter[field] = {
                value,
                matchMode: type,
            };
            filterManager.setFilter(filter);
        });
        this.searchBar.addEventListener('keypress', e => {
            if(e.keyCode === 13){
                e.preventDefault();
                let field = this.fieldLabel.getAttribute('value');
                let type = this.typeLabel.getAttribute('value');
                let value = this.searchBar.value;
                let filter = {};
                filter[field] = {
                    value,
                    matchMode: type,
                };
                filterManager.setFilter(filter);
            }
        });

        this.clearButton = document.querySelector('#searchContainer .clearButton');
        this.clearButton.addEventListener('click', () => this.clearFilters());
        let fieldElements = document.querySelectorAll('#searchContainer .dropdown.field a.dropdown-item');
        let typeElements = document.querySelectorAll('#searchContainer .dropdown.type a.dropdown-item');

        for(let field of fieldElements){
            field.addEventListener('click', e => {
                let type = e.currentTarget.getAttribute('type');
                let value = e.currentTarget.getAttribute('value');
                this.searchBar.setAttribute('type', type);
                this.fieldLabel.setAttribute('value', value);
                this.fieldLabel.innerText = e.currentTarget.innerText;
                let newType = {};
                for(let element of typeElements){
                    if(element.getAttribute('type').includes(type)){
                        element.style.display = 'block';
                        if(!newType.value){
                            newType = {
                                value: element.getAttribute('value'),
                                text: element.innerText,
                            };
                        }
                    }else{
                        element.style.display = 'none';
                    }
                }
                this.typeLabel.innerText = newType.text;
                this.typeLabel.setAttribute('value', newType.value);
                this.clearFilters();
            });
        }
        for(let type of typeElements){
            type.addEventListener('click', e => {
                let value = e.currentTarget.getAttribute('value');
                this.typeLabel.innerText = e.currentTarget.innerText;
                this.typeLabel.setAttribute('value', value);
            });
        }
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

    removeFilter(filter){
        delete this.filters[filter];
        this.reload(0);
    }

    clearFilters(){
        this.filters = {};
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

        let response = await ApiService.products(queryData);
        return response.data;
    }

    async categories()
    {
        let response = await ApiService.categories();
        return response.data;
    }
}

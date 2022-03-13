const searchBar = document.querySelector('#searchBar');
const categoryLabel = document.querySelector('#categoryLabel');
const categoryList = document.querySelector('#categoryList');
const productList = document.querySelector('#productList');
const clearButton = document.querySelector('#clearButton');
const pagination = new Pagination(document.querySelector('#pagination'), reloadProducts);
const apiService = new ApiService(reloadProducts);

(async () => {
    clearButton.addEventListener('click', clearFilters);
    searchBar.addEventListener('keypress', e => {
        if(e.keyCode === 13){
            e.preventDefault();
            apiService.setFilter({
                name: {
                    value: e.currentTarget.value,
                    matchMode: 'contains',
                }
            });
            reloadProducts(0);
        }
    })
    let [productResponse, categoryResponse] = await Promise.all([
        apiService.products(),
        apiService.categories(),
    ]);

    if(productResponse.success){
        printProducts(productResponse.data);
        pagination.setTotalRecords(productResponse.totalRows)
    }

    if(categoryResponse.success){
        printCategories(categoryResponse.data);
    }
})();

async function reloadProducts(page = 0){
    let response = await apiService.products(page * 12, 12);
    if(response.success){
        printProducts(response.data);
        pagination.setTotalRecords(response.totalRows);
    }
}

async function categoryOnClick(e){
    e.preventDefault();
    let categoryId = e.currentTarget.getAttribute('category');
    let categoryName = e.currentTarget.innerText;
    
    categoryLabel.innerHTML = `<span class="badge bg-success mt-1">Categoria: ${categoryName}</span>`;

    productList.innerHTML = '';
    apiService.setCategory(categoryId);
    clearButton.style.display = 'block';
    pagination.setPage(0);
}

async function clearFilters(e){
    categoryLabel.innerHTML = '';
    clearButton.style.display = 'none';
    productList.innerHTML = '';
    let response = await apiService.products();
    if(response.success){
        printProducts(response.data);
        pagination.setTotalRecords(response.totalRows)
    }
}

function printCategories(categories){
    categoryList.innerHTML = '';
    for(let category of categories){
        categoryList.innerHTML += `
            <li><a class="dropdown-item" href="#" category="${category.id}">${category.name}</a></li>
        `;
    }
    let links = categoryList.querySelectorAll('a.dropdown-item');
    for(let link of links){
        link.addEventListener('click', categoryOnClick);
    }
}

function printProducts(products){
    productList.innerHTML = '';
    for(let product of products){
        productList.innerHTML += `
            <div class="col" productId="${product.id}">
                <div class="card shadow-sm">
                    <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${product.url_image}"/>
            
                    <div class="card-body">
                        <h3>${product.name}</h3>
                        <p class="card-text">S/${product.price}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary capitalize">${product.categoryM.name}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

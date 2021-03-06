const categoryLabel = document.querySelector('#categoryLabel');
const categoryList = document.querySelector('#categoryList');
const productList = document.querySelector('#productList');
const clearButton = document.querySelector('#clearButton');
const pagination = new Pagination(document.querySelector('#pagination'), reloadProducts);
const filterManager = new Filters(reloadProducts);

(async () => {
    clearButton.addEventListener('click', clearFilters);
    setPlaceholders();
    let [productResponse, categoryResponse] = await Promise.all([
        filterManager.products(),
        filterManager.categories(),
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
    setPlaceholders();
    let response = await filterManager.products(page * 12, 12);
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
    filterManager.setCategory(categoryId);
    clearButton.style.display = 'block';
    pagination.setPage(0);
}

async function clearFilters(e){
    categoryLabel.innerHTML = '';
    clearButton.style.display = 'none';
    productList.innerHTML = '';
    filterManager.setCategory(undefined);
    setPlaceholders();
    let response = await filterManager.products();
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
        let priceSpan = `<span class="badge rounded-pill bg-secondary price-pill">S/${product.price}</span>`;
        let discountSpan = '';
        if(product.discount > 0){
            priceSpan = `
                <span class="text-decoration-line-through">S/${product.price}</span>
                <span class="badge rounded-pill bg-danger">
                    ${product.discount}%
                </span>
            `;
            discountSpan = `
                <span class="badge rounded-pill bg-warning text-dark discount-pill">
                    S/ ${product.price * (1 - product.discount / 100)}
                </span>
            `;
        }
        productList.innerHTML += `
            <div class="col" productId="${product.id}">
                <div class="card border border-secondary shadow-sm">
                    <img class="bd-placeholder-img card-img-top" width="100%" height="300" src="${product.url_image}" onerror="this.src='img/errorPlaceholder.jpg'"/>
            
                    <div class="card-body">
                        <h5>${product.name}</h5>
                        <p class="card-text">${priceSpan}${discountSpan}</p>
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

function setPlaceholders()
{
    productList.innerHTML = '';
    for(let i = 0; i < 4; i++){
        productList.innerHTML += `
            <div class="col">
                <div  class="card border border-secondary" aria-hidden="true">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="300" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                    </svg>
            
                    <div class="card-body">
                        <h3 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                        </h3>
                        <p class="card-text placeholder-glow"><span class="placeholder col-4"></span></p>
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="#" tabindex="-1" class="btn btn-sm btn-outline-secondary disabled placeholder col-4"></a>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
}

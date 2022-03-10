const searchBar = document.querySelector('#searchBar');
const categoryList = document.querySelector('#categoryList');
const productList = document.querySelector('#productList');

(async () => {
    let [productResponse, categoryResponse] = await Promise.all([
        ApiService.products(),
        ApiService.categories(),
    ]);

    if(productResponse.success){
        categoryList.innerHTML = '';
        for(let product of productResponse.data){
            console.log(product);
            productList.innerHTML += `
                <div class="col" productId="${product.id}">
                    <div class="card shadow-sm">
                        <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${product.url_image}"/>
                
                        <div class="card-body">
                            <h3>${product.name}</h3>
                            <p class="card-text">S/${product.price}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    if(categoryResponse.success){
        categoryList.innerHTML = '';
        for(let category of categoryResponse.data){
            categoryList.innerHTML += `
                <li><a class="dropdown-item" href="#" category="${category.id}">${category.name}</a></li>
            `;
        }
    }
})();

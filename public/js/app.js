const searchBar = document.querySelector('#searchBar');
const categoryList = document.querySelector('#categoryList');

(async () => {
    let categoryResponse = await ApiService.categories();
    if(categoryResponse.success){
        categoryList.innerHTML = '';
        for(let category of categoryResponse.data){
            categoryList.innerHTML += `
                <li><a class="dropdown-item" href="#" category="${category.id}">${category.name}</a></li>
            `;
        }
    }
})();
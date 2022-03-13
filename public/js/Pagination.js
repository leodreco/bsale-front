class Pagination
{
    constructor(container, reloadProducts){
        this.container = container;
        this.pagesDiv = container.querySelector('.pages');
        this.skip = 0;
        this.take = 12;
        this.totalRecords = 0;
        this.pages = 0;
        this.currentPage = 0;
        this.reloadProducts = reloadProducts;

        this.container.querySelector('.next').addEventListener('click', e => {
            pagination.nextPage();
        });

        container.querySelector('.previous').addEventListener('click', e => {
            pagination.previousPage();
        });
    }

    getPagination(){
        return {
            skip: this.skip,
            take: this.take
        };
    }

    setPage(page){
        this.currentPage = page;
        this.skip = this.take * page;
        this.printDescription();
        this.reloadProducts(this.currentPage);
    }

    nextPage(){
        if(this.currentPage > this.pages - 1) return;
        this.setPage(this.currentPage + 1);
    }

    previousPage(){
        if(this.currentPage == 0) return;
        this.setPage(this.currentPage - 1);
    }

    setTotalRecords(total){
        this.totalRecords = total;
        this.pages = Math.floor(this.totalRecords / this.take);
        this.printButtons();
        this.printDescription();
    }

    printButtons(){
        this.pagesDiv.innerHTML = '';
        for(let i = 0; i <= this.pages; i++){
            let active = this.skip == i * this.take ? 'active' : '';
            this.pagesDiv.innerHTML += `<button type="button" class="btn btn-primary ${active}" page="${i}">${ i + 1 }</button>`;
        }
        let buttons = this.pagesDiv.querySelectorAll('button');
        for(let button of buttons){
            button.addEventListener('click', e => {
                e.currentTarget.classList.add('active');
                let page = parseInt(e.currentTarget.getAttribute('page'));
                productList.innerHTML = '';
                pagination.setPage(page);
            });
        }
    }

    printDescription(){
        let to = this.skip + this.take
        if(to > this.totalRecords){
            to = this.totalRecords;
        }
        this.container.querySelector('.descripcion p').innerText = `Mostrando ${this.skip + 1} a ${to} de ${this.totalRecords} entradas`;
    }
}

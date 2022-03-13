# bsale-front

Listado de productos, con paginacion, ordenado de items, filtros consumiendo un api.

Proyecto backend con el api: https://github.com/leodreco/bsale-back

Visualisar el proyecto en: https://leodreco.github.io/bsale-front/public

Desarrollado en vanilla javascript  y usando las librerias
- Axios
- Boostrap

## Separado en 5 archivos js

### app.js
Declara las variables y añade eventos

### ApiService.js
Controla el llamado a las apis

### Filters.js
Controla los filtros y orden. Soporta filtros con multiples campos y modos

### Pagination.js
Controla la paginación

### UrlQuerySerialize.js
Convierte objetos a un query válido de en url, usado por ApiService

Ejemplo:

```
{
    filters: {
        name: {
            value: 'ron',
            matchMode: 'contains',
        }
    },
    sortField: 'id'
}

Sería

filters[name][value]="ron"&filters[name][matchMode]="contains"&sortField=id
```

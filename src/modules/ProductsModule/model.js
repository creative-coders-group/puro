import fetch from "../../utils/postgres.js";

const PRODUCTS = `
select *, c.categorie_name from products p left join categories c on c.category_id = p.category_id; 
`;

const ADDProduct = `
insert into products 
(category_id, 
  product_name, 
  price, 
  short_descriptoin, 
  long_description, 
  picture_name)
   values
($1, $2, $3, $4, $5, $6)
`;

const EDITProduct = `
update products p set 
category_id = (
  case when $2 > 0 then $2 else p.category_id end
)
product_name = (
  case when length($3) > 0 then $3 else p.product_name end
)
price = (
  case when $4 > 0 then $4 else p.price end
)
short_descriptoin = (
  case when length($5) > 0 then $5 else p.short_descriptoin end
)
long_description = (
  case when length($6) > 0 then $6 else p.long_description end
)
WHERE p.product_id = $1
returning *
`;

const REMOVEProduct = `
delete from products p where p.product_id = $1
returning *
`;

function addProduct({
  category_id,
  product_name,
  price,
  short_descriptoin,
  long_description,
  picture_name,
}) {
  return fetch(
    ADDProduct,
    category_id,
    product_name,
    price,
    short_descriptoin,
    long_description,
    picture_name
  );
}

function editProduct({
  product_id,
  category_id,
  product_name,
  price,
  short_descriptoin,
  long_description,
  picture_name,
}) {
  return fetch(
    EDITProduct,
    product_id,
    category_id,
    product_name,
    price,
    short_descriptoin,
    long_description,
    picture_name
  );
}

function removeProduct({ product_id }) {
  return fetch(REMOVEProduct, product_id);
}

function products() {
  return fetch(PRODUCTS);
}

export default {
  products,
  addProduct,
  editProduct,
  removeProduct,
};

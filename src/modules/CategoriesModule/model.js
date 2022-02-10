import fetch from "../../utils/postgres.js";

const CATEGORIES = `
select 
c.category_id,
c.categorie_name,
json_agg(p) as products
from categories c 
inner join products p on c.category_id = p.category_id
group by c.category_id, c.categorie_name
order by c.category_id
`;

const ADDCATEGORY = `
insert into categories (categorie_name) values
($1)
`;

const EDITCATEGORY = `
update categories c set categorie_name = $2
where c.category_id = $1
returning *
`;

const REMOVECATEGORY = `
delete from categories c  where
c.category_id = $1 
`;

function categories() {
  return fetch(CATEGORIES);
}

function addCategory({ categorie_name }) {
  return fetch(ADDCATEGORY, categorie_name);
}

function editCategory({ categorie_name, category_id }) {
  return fetch(EDITCATEGORY, category_id, categorie_name);
}

function removeCategory({ category_id }) {
  return fetch(REMOVECATEGORY, category_id);
}

export default {
  categories,
  addCategory,
  editCategory,
  removeCategory,
};

// WHERE
// 	CASE
// 		WHEN $1 > 0 THEN user_id = $1
// 		ELSE TRUE
// 	END AND
// 	CASE
// 		WHEN LENGTH($2) > 0 THEN (
// 			user_name ILIKE CONCAT('%', $2, '%')
// 		) ELSE TRUE
// 	END AND
// 	CASE
// 		WHEN $3 IN (true, false) THEN active = $3
// 		ELSE TRUE
// 	END
// 	ORDER BY user_id
// 	offset $4 limit $5
// { pagination: { page, limit }, search, user_id }
// , user_id, search, (page - 1) * limit, limit

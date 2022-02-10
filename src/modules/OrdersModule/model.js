import fetch from "../../utils/postgres.js";

const ORDERS = `
select * from orders
WHERE
	CASE
		WHEN $1 > 0 THEN user_id = $1
		ELSE TRUE
	END
`;

const ADDORDER = `
insert into orders  (user_id, product_id, is_paid) values 
($1, $2, 0)
`;

const REMOVEORDER = `
delete from orders 
where
orders.order_id = $1 and orders.is_paid = 0
returning *
`;

const BUYALLORDERS = `
update orders set is_paid = 1,
order_created_at = NOW()
where
orders.user_id = $1 and
orders.is_paid = 0
returning is_paid, order_created_at
`;

function addOrder(user_id, { product_id }) {
  return fetch(ADDORDER, user_id, product_id);
}

function removeOrder({ order_id }) {
  return fetch(REMOVEORDER, order_id);
}

function buyAllOrders(user_id) {
  return fetch(BUYALLORDERS, user_id);
}

function orders({ user_id }) {
  return fetch(ORDERS.at, user_id);
}

export default {
  addOrder,
  removeOrder,
  orders,
  buyAllOrders,
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

import { toApolloError } from "apollo-server-express";
import fetch from "../../utils/postgres.js";

const TOTALPAIDMONEY = `
select sum(products.price)
 from orders left join products
on orders.product_id=products.product_id
 where orders.is_paid = 1;
`;

const TOTALUNPAIDMONEY = `
select sum(products.price)
 from orders left join products
on orders.product_id=products.product_id
 where orders.is_paid = 0;
`;

function totalPaidMoney() {
  return fetch(TOTALPAIDMONEY);
}

function totalUnPaidMoney() {
  return fetch(TOTALUNPAIDMONEY);
}

export default {
  totalPaidMoney,
  totalUnPaidMoney,
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

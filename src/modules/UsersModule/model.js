import fetch from "../../utils/postgres.js";

const USERS = `
	SELECT
		user_id,
		user_name,
		email,
		contact,
		role
	FROM users
	WHERE
	CASE
		WHEN $1 > 0  THEN user_id = $1
		ELSE TRUE
	END 
`;

function users({ user_id }) {
  return fetch(USERS, user_id);
}

export default {
  users,
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

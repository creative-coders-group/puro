import fetch from "../../utils/postgres.js";

const REGISTER = `
insert into users
 (user_name, password, contact, email, role)
  values
($1, crypt($2, gen_salt('bf')), $3, $4, 'user')
returning role, user_id
`;

const LOGIN = `
select role, user_id
from users
where
user_name = $1 and 
crypt($2, password) = password
`;

function register({ user_name, password, contact, email }) {
  return fetch(REGISTER, user_name, password, contact, email);
}

function login({ user_name, password }) {
  return fetch(LOGIN, user_name, password);
}

export default {
  register,
  login,
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

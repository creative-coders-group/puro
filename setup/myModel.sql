create database puro;

create extension pgcrypto;

create table categories (
    category_id int generated always as identity unique,
    categorie_name varchar(30) not null unique
);

insert into categories (categorie_name) values
('drinks'), ('burgers'), ('pizzas'), ('deserts');



create table products(
    product_id int generated always as identity unique,
    category_id int not null references categories(category_id),
    product_name varchar(30) not null,
    price bigint not null,
    short_descriptoin varchar(100) not null,
    long_description text not null,
    picture_name varchar(100) not null
);

insert into products (category_id, product_name, price, short_descriptoin, long_description, picture_name) values
(1, 'Fanta', 10000, 'Fanta with vitamine C', 'Fanta is a brand of fruit-flavored carbonated soft drinks created by Coca-Cola Deutschland under the leadership of German businessman Max Keith. There are more than 150 flavors worldwide. Fanta originated in Germany as a Coca-Cola substitute in 1940 due to the American trade embargo of Nazi Germany which affected the availability of Coca-Cola ingredients. ', 'fanta.jpg'),
(1, 'Sprite', 7000, 'Cold Sweet Ice water', 'Sprite is a colorless, lemon and lime-flavored soft drink created by The Coca-Cola Company. It was first developed in West Germany in 1959 as Fanta Klare Zitrone ("Clear Lemon Fanta") and was introduced in the United States under the current brand name Sprite in 1961 as a competitor to 7 Up.[1] Sprite comes in multiple flavors, including cranberry, cherry, grape, orange, and vanilla.', 'sprite.jpg'),
(1, 'Pepsi', 11000, 'Pepsi since 1950', 'Pepsi is a carbonated soft drink manufactured by PepsiCo. Originally created and developed in 1893 by Caleb Bradham and introduced as Brad s Drink, it was renamed as Pepsi-Cola in 1898,[1] and then shortened to Pepsi in 1961.', 'pepsi.jpg'),
(1, 'Ice Tea', 8000, 'Coming from North Pole', 'Iced tea (or ice tea[1]) is a form of cold tea. Though usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar, syrup and/or apple slices. Iced tea is also a popular packaged drink and can be mixed with flavored syrup, with multiple common flavors including lemon, raspberry, lime, passion fruit, peach, orange, strawberry, and cherry.', 'icetea.jpg'),
(2, 'Hamburger', 18000, 'Classic fast food', 'A hamburger (or burger for short) is a food, which in American English is considered a sandwich (but not in other English varieties, such as British or Australian, in which the definition of sandwich is narrower),[1] consisting of one or more cooked patties—usually ground meat, typically beef—placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, smoked or flame broiled.', 'hamburger.jpg'),
(2, 'Big Burger', 23000, 'Big man needs Big food', 'Big burger is a food, which in American English is considered a sandwich (but not in other English varieties, such as British or Australian, in which the definition of sandwich is narrower),[1] consisting of one or more cooked patties—usually ground meat, typically beef—placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, smoked or flame broiled.', 'bigburger.jpg'),
(2, 'Cheeseburger', 21000, 'Burger with cheese "cheers"', 'A cheeseburger is a hamburger topped with cheese. Traditionally, the slice of cheese is placed on top of the meat patty. The cheese is usually added to the cooking hamburger patty shortly before serving, which allows the cheese to melt', 'cheeseburger.jpg'),
(2, 'Angus Burger', 25000, 'Yet another type of burger', 'An Angus burger is a hamburger made using beef from Angus cattle. The name Angus burger is used by several fast-food hamburger chains for one or more "premium" burgers; however, it does not belong to any single company. Pre-made frozen Angus burgers are increasingly available from retailers.', 'angusburger.jpg'),
(3, 'Margherita ', 55000, 'Good lunch couples', 'Pizza Margherita (more commonly known in English as Margherita pizza) is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.', 'margherita.jpg'),
(3, 'Italiano', 65000, 'Amanti del buon pranzo', 'Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients', 'italianopizza.jpg'),
(3, 'Cheese Pizza', 60000, 'Very tasty and delicious', 'Pizza cheese encompasses several varieties and types of cheeses and dairy products that are designed and manufactured for use specifically on pizza. These include processed and modified cheese such as mozzarella-like processed cheeses and mozzarella variants','cheesepizza.jpg'),
(3, 'Steak Pizza', 80000, 'Lots of meat makes you full', 'Pizza topped with thick cuts of well-cooked meat. Recommended for those who love pizza, but also want copious amounts of meat in their meal','steakpizza.jpg'),
(4, 'Ice Cream', 10000, 'Do this thingy needs description?!', 'Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from milk or cream and is flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit such as strawberries or peaches','icecream.jpg'),
(4, 'Yogurt', 7000, 'Very sweet type of milk', 'Yogurt also spelled yoghurt, yogourt or yoghourt, is a food produced by bacterial fermentation of milk. The bacteria used to make yogurt are known as yogurt cultures.','yogurt.jpg'),
(4, 'Cocktail', 13000, 'Like yogurt but not like yogurt', 'A cocktail is an alcoholic mixed drink. Most commonly, cocktails are either a combination of spirits, or one or more spirits mixed with other ingredients such as fruit juice, flavored syrup, or cream', 'cocktail.jpg'),
(4, 'Cake', 30000, 'what can make you more happy than cake?', 'Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate','cake.jpg');

create table users (
	user_id int generated always as identity unique,
	user_name character varying(30) not null unique,
	password character varying(256) not null,
	contact bigint not null,
    email character varying(100) not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    role character varying(20) check(role in ('admin', 'user'))
);

insert into users (user_name, password, contact, email, role) values
('Alfred', crypt('P1@#q]vbSa%K', gen_salt('bf')), 998901231213, 'AlfredNobel1960@gmail.com', 'user'),
('Zayn', crypt('kavasaki2@', gen_salt('bf')), 998906575667, 'ZaynMalik@mail.ru', 'user'),
('Harry', crypt('R#5$tyu!@21', gen_salt('bf')), 998977891234, 'HarryStyles@outlook.com', 'user'),
('Levy', crypt('gothamchess2@', gen_salt('bf')), 998933453445, 'levyrozmann@mail.ru', 'user'),
('Admin', crypt('Admin2@', gen_salt('bf')), 998977777777, 'Adminoka@mail.ru', 'admin');


create table orders (
    order_id int generated always as identity unique,
    user_id int not null references users(user_id),
    product_id int not null references products(product_id),
    is_paid int check (is_paid in (1, 0)),
	order_created_at  timestamp default current_timestamp
);

insert into orders (user_id, product_id, is_paid) values 
(1, 5, 0),(1,3,0),(2,4,0),(1,2,0),(2, 4, 0)(3, 2, 1), (3, 3 , 1), (3, 4, 1);

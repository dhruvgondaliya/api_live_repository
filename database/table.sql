create table admins(
    id int AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

create table users(
    id int AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    isActive BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (admin_id) references admins(id)
)

create table add_products(
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    product_name VARCHAR(100) NOT NULL,
    product_discription VARCHAR(100) NOT NULL,
    product_price int,
    product_brand VARCHAR(100) NOT NULL,
    product_colour VARCHAR(100) NOT NULL,
    product_discount VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    return_policy VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references users(id)
)

create table details(
    id int AUTO_INCREMENT PRIMARY KEY,
    product_id int,
    product_name VARCHAR(100) NOT NULL,
    product_discription VARCHAR(100) NOT NULL,
    product_price int,
    product_discount VARCHAR(5) NOT NULL,
    product_brand VARCHAR(100) NOT NULL,
    product_colour VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    return_policy VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (product_id) references add_products(id) 
)

create table carts(
    id int AUTO_INCREMENT PRIMARY KEY,
    details_id int,
    product_name VARCHAR(100) NOT NULL,
    product_price int,
    product_discount VARCHAR(100) NOT NULL,
    quantity int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (user_id) references users(id)
)

create table home_screens(
    id int AUTO_INCREMENT PRIMARY KEY,
    product_id int,
    product_name VARCHAR(100) NOT NULL,
    product_discription VARCHAR(100) NOT NULL,
    product_price int,
    product_discount VARCHAR(5) NOT NULL,
    product_brand VARCHAR(100) NOT NULL,
    product_colour VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    return_policy VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (product_id) references add_products(id)
)

create table delivery_details(
    id int AUTO_INCREMENT PRIMARY KEY,
    cart_id int,
    your_name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(20)NOT NULL,
    pincode int NOT NULL,
    state VARCHAR(20) NOT NULL,
    phone_number VARCHAR(100) NOT NULL,
    product_price int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    foreign key (cart_id) references carts(id);
)
 
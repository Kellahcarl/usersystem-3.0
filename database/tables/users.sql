

CREATE TABLE users (
	_id varchar(100) NOT NULL PRIMARY KEY,
	first varchar(100) NOT NULL,
	last varchar(100) NOT NULL,
	email varchar(250) NOT NULL,
	isDeleted BIT NOT NULL,
	Assigned BIT NULL,
	phone VARCHAR(10)  NULL,
	isAdmin BIT NOT NULL,
	password varchar(250) NOT NULL,
)


-- select * from users
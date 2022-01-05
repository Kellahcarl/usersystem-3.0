CREATE TABLE AssignedProjects (
	_id varchar(100) NOT NULL PRIMARY KEY,
	project_id varchar(100) NOT NULL,
	user_id varchar(100) NOT NULL,
	assign_status BIT NOT NULL,
)
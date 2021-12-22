CREATE OR ALTER PROCEDURE dbo.sp_getAssignedProject
	@project_id varchar(100)
AS
BEGIN
select
	u.first,
	u.last,
	u.email,
	u.isAdmin,
	u._id ,
	p.name,
	p._id
	FROM 
dbo.AssignedProjects a
INNER JOIN
dbo.projects p on a.project_id = p._id
INNER JOIN 
dbo.users u on u._id = a.user_id

WHERE p._id = @project_id
END
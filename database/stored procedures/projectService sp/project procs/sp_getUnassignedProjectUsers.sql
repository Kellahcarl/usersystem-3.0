CREATE OR ALTER PROCEDURE dbo.sp_getUnssignedProjectUsers

AS
BEGIN
select
	-- u.first,
	-- u.last,
	-- u.email,
	-- u.isAdmin,
	-- u._id ,
	p.name,
	p._id
	FROM 
dbo.AssignedProjects a
LEFT JOIN
dbo.projects p on a.project_id = p._id
-- INNER JOIN 
-- dbo.users u on u._id = a.user_id

WHERE a._id is NULL AND  assign_status=0


END


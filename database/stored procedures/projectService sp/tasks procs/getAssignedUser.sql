
CREATE OR ALTER  PROCEDURE [dbo].[getAssignedUser]
	@task_id varchar(100)
AS
BEGIN
select
	u.first,
	u.last,
	u.email,
	u.isAdmin,
	u._id uid,
	t.name,
	t._id
	FROM 
dbo.AssignedTasks a
INNER JOIN
dbo.tasks t on a.task_id = t._id
INNER JOIN 
dbo.users u on u._id = a.user_id

WHERE t._id = @task_id
END
GO

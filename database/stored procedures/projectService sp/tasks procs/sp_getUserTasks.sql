CREATE OR ALTER  PROCEDURE [dbo].[sp_getUsertasks]
@user_id varchar(100)
as

set nocount on;

begin
	select	a.task_id,
            -- a.user_id,
            p.name pname,
            p.description pdescription,
            t.name tname,
            t.project_id,
            t.description tdescription,
            t.start_date,
            t.end_date

	from	dbo.AssignedTasks a
    inner join 
    dbo.tasks t on a.task_id = t._id
    inner join 
    dbo.projects p on t.project_id = p._id

    where a.user_id = @user_id and t.isDeleted = 0
end;
GO
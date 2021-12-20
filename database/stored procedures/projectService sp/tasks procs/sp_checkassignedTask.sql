CREATE OR ALTER PROCEDURE [dbo].[sp_checkassignedTask]
	@user_id varchar(100)
as


begin
	select task_id
	from dbo.AssignedTasks
    where assign_status=1 and user_id=@user_id
end;

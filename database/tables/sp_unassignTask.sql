CREATE OR ALTER PROCEDURE [dbo].[sp_unassignTask]
	@task_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.AssignedTasks
	SET 
	assign_status=0
	WHERE task_id = @task_id;
end;
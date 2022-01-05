
CREATE OR ALTER  PROCEDURE [dbo].[sp_unassignTask]
	@task_id varchar(100)
as

set nocount on;

begin
	DELETE FROM dbo.AssignedTasks
	
	WHERE task_id = @task_id;
end;
GO


CREATE OR ALTER PROCEDURE [dbo].[sp_unCompleteTask]
	@task_id varchar(100)
AS
set nocount on;

BEGIN
	UPDATE dbo.tasks set isCompleted = 0 where _id = @task_id
END



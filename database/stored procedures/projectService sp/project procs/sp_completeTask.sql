CREATE PROCEDURE [dbo].[sp_completeTask]
	@task_id varchar(100)
AS
set nocount on;

BEGIN
	UPDATE dbo.tasks set isCompleted = 1 where _id = @task_id
END
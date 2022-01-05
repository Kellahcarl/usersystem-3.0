CREATE OR ALTER PROCEDURE [dbo].[sp_assigntaskuser]
	@task_id varchar(100)
AS
set nocount on;

BEGIN
	UPDATE dbo.tasks set assigned = 1 where _id = @task_id
END
CREATE PROCEDURE [dbo].[sp_deleteTask]
	@task_id varchar(100)
AS
set nocount on;

BEGIN
	UPDATE dbo.tasks set isDeleted = 1 where _id = @task_id
END
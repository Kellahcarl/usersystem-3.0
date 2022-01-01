
CREATE OR ALTER  PROCEDURE [dbo].[sp_assignTask]
	@id varchar(100),
	@task_id varchar(100),
	@user_id varchar(100)
as

set nocount on;

begin
	INSERT INTO dbo.AssignedTasks
	(_id,user_id,task_id)
	VALUES
	(@id, @user_id, @task_id);
end;
GO



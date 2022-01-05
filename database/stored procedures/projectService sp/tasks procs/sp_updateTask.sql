CREATE OR ALTER PROCEDURE [dbo].[sp_updateTask]
	@task_id varchar(100),
	@name varchar(100),
	@project_id varchar(100),
	@start_date date,
	@end_date date,
	@duration varchar(100),
	@description varchar(500)
as

set nocount on;

begin
	UPDATE dbo.tasks
	SET 
	name=@name, 
	project_id=@project_id, 
	description=@description,
	duration=@duration,
	start_date=@start_date,
	end_date=@end_date
	WHERE _id = @task_id;
end;
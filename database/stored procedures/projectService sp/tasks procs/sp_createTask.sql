CREATE OR ALTER PROCEDURE [dbo].[sp_createTask]
	@id varchar(100),
	@name varchar(100),
	@project_id varchar(100),
	@duration varchar(100),
	@start_date date,
	@end_date date,
	@description varchar(500)
as

set nocount on;

begin
	INSERT INTO dbo.tasks
	(_id, name, project_id, start_date, end_date, description, duration, isDeleted, isCompleted)
	VALUES
	(@id, @name, @project_id, @start_date, @end_date, @description, @duration, 0, 0);
end;
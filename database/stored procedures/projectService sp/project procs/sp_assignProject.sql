CREATE OR ALTER PROCEDURE [dbo].[sp_assignProject]
	@id varchar(100),
	@project_id varchar(100),
	@user_id varchar(100)
as

set nocount on;

begin
	INSERT INTO dbo.AssignedProjects
	(_id,user_id,project_id,assign_status)
	VALUES
	(@id, @user_id, @project_id,1);
end;
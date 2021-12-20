CREATE OR ALTER PROCEDURE [dbo].[sp_checkassignedProject]
	@user_id varchar(100)
as


begin
	select project_id
	from dbo.AssignedProjects
    where assign_status=1 and user_id=@user_id
end;
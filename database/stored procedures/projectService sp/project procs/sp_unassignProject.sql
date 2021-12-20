CREATE OR ALTER PROCEDURE [dbo].[sp_unassignProject]
	@project_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.AssignedProjects
	SET 
	assign_status=0
	WHERE project_id = @project_id;
end;
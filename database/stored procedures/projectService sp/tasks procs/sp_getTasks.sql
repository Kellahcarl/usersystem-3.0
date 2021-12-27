CREATE OR ALTER PROCEDURE [dbo].[sp_getTasks]
as


begin
set nocount on;
	select	t._id,
			t.name,
			t.project_id,
			t.duration,
			t.start_date,
			t.end_date,
			t.description
	from	[tasks] t 
	where isDeleted = 0;
end;
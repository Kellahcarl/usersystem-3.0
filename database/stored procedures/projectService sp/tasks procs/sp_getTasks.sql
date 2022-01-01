CREATE OR ALTER PROCEDURE [dbo].[sp_getTasks]
(@PageNumber INT = 0,
@NumberOfRecordsPerPage INT = 100)
as


begin
set nocount on;
	select	t._id,
			t.name,
			t.project_id,
			t.duration,
			t.start_date,
			t.end_date,
			t.description,
			t.assigned,
			t.isCompleted
	from	[tasks] t 
	where isDeleted = 0
	ORDER BY t._id
	OFFSET (@PageNumber * @NumberOfRecordsPerPage) ROWS
			FETCH NEXT @NumberOfRecordsPerPage ROWS ONLY
	;
	
end;
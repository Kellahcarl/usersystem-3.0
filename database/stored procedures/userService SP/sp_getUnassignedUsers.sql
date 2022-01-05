CREATE OR ALTER  PROCEDURE [dbo].[sp_UnassignedUsers]
as

set nocount on;

begin
	select	u.[_id],
			u.first,
			u.last
	from	[users] u 
    where Assigned = 0
end;
GO

exec sp_UnassignedUsers


-- Delete rows from table '[AssignedTasks]' in schema '[dbo]'
-- Update rows in table '[users]' in schema '[dbo]'
-- UPDATE [dbo].[users]
-- SET
-- 	Assigned = 0

-- GO
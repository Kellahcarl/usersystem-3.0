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

exec sp_UnassignedUsers
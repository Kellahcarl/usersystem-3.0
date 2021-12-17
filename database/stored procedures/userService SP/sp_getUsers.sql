CREATE OR ALTER  PROCEDURE [dbo].[sp_getUsers]
as

set nocount on;

begin
	select	u.[_id],
			u.first,
			u.last,
			u.email,
			u.isAdmin
	from	[users] u ;
end;
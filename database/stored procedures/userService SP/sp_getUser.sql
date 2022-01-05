CREATE OR ALTER PROCEDURE [dbo].[sp_getUser]
	@userId	varchar(100)
as

set nocount on;

begin
	select	u.[_id],
			u.first,
			u.last,
			u.email,
			u.isAdmin
	from	[users] u where _id = @userId;
end;
CREATE OR ALTER PROCEDURE [dbo].[sp_getUserByEmail]
	@email	varchar(250)
as

set nocount on;

begin
	select	u.[_id],
			u.first,
			u.last,
			u.email,
			u.isAdmin,
			u.password
	from	[users] u where email = @email;
end;

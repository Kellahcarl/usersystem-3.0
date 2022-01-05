CREATE OR ALTER  PROCEDURE [dbo].[sp_updateUser]
	@id varchar(100),
	@firstname varchar(100),
	@lastname varchar(100),
	@email varchar(250)
as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	first=@firstname, 
	last=@lastname, 
	email=@email
	WHERE _id = @id;
end;


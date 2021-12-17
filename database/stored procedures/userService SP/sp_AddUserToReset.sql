CREATE OR ALTER PROCEDURE [dbo].[sp_AddUserToReset]
	@userId	varchar(100)
as

set nocount on;

BEGIN
	insert into dbo.password_reset_list (userId,isDeleted)
    values (@userId,1)
END
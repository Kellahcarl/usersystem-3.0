CREATE OR ALTER  PROCEDURE [dbo].[sp_userRegister]
	@id varchar(100),
	@firstname varchar(100),
	@lastname varchar(100),
	@email varchar(250),
	@password varchar(250),
	@isAdmin int,
	@isDeleted BIT
as

set nocount on;

begin
	INSERT INTO dbo.users
	(_id, first, last, email,isDeleted, password, isAdmin)
	VALUES
	(@id, @firstname, @lastname, @email,@isDeleted, @password, @isAdmin);
end
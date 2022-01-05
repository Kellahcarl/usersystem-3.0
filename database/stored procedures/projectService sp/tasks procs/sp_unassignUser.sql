CREATE OR ALTER  PROCEDURE [dbo].[sp_unassignUser]
    @user_id varchar(100)

as

set nocount on;

begin
	UPDATE dbo.users SET Assigned = 0
    WHERE _id = @user_id
end;
GO



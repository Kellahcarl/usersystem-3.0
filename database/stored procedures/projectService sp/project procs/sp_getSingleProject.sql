CREATE OR ALTER PROCEDURE [dbo].[sp_getSingleProject]
	@project_id varchar(100)
as

set nocount on;

begin
	select	p._id,
			p.name,
			p.start_date,
			p.end_date,
			p.client_name,
			p.description
	from	[projects] p where _id = @project_id and isDeleted = 0;
	
end;
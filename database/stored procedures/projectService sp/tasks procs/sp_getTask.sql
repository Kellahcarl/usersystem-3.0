CREATE OR ALTER PROCEDURE [dbo].[sp_getTask]
 @task_id varchar(100)
as

set nocount on;

begin
	select	t._id,
			t.name,
			t.project_id,
			t.duration,
			t.start_date,
			t.end_date,
			t.description,
			t.isDeleted,
			t.iscompleted
	from	[tasks] t 
	where  _id=@task_id and isDeleted = 0;
end;



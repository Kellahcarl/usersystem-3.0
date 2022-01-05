CREATE OR ALTER PROCEDURE [dbo].[sp_checkassignedTask]
	@user_id varchar(100)
as


begin
	select task_id
	from dbo.AssignedTasks
    where user_id=@user_id
end;

-- Insert rows into table 'tasks' in schema '[dbo]'
-- -- Update rows in table '[TableName]' in schema '[dbo]'
-- UPDATE [dbo].[tasks]
-- SET
-- 	assigned = 0
-- 	-- Add more columns and values here
-- GO
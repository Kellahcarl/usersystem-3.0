CREATE OR ALTER PROCEDURE [dbo].[sp_getProjects]
(
    @project_id varchar(100) = NULL,
    @PageNumber INT = 0,
    @NumberOfRecordsPerPage INT = 100
)

AS
BEGIN
    SET NOCOUNT ON;

	SELECT * FROM dbo.projects p
			where isDeleted = 0
			ORDER BY p._id
			OFFSET (@PageNumber * @NumberOfRecordsPerPage) ROWS
			FETCH NEXT @NumberOfRecordsPerPage ROWS ONLY
			FOR JSON PATH, INCLUDE_NULL_VALUES
END

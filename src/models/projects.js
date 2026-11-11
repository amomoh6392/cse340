
import db from './db.js';

// Retrieve all service projects
const getAllProjects = async () => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.organization_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.project_date,
            organization.name AS organization_name
        FROM public.service_project
        INNER JOIN public.organization
        ON service_project.organization_id = organization.organization_id
        ORDER BY service_project.project_date ASC;
    `;

    const result = await db.query(query);
    return result.rows;
};

// Retrieve service projects belonging to one organization
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY project_date ASC;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };

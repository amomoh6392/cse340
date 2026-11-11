
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

// Retrieve the next upcoming service projects
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.project_date AS date,
            service_project.location,
            service_project.organization_id,
            organization.name AS organization_name
        FROM public.service_project
        INNER JOIN public.organization
        ON service_project.organization_id = organization.organization_id
        WHERE service_project.project_date >= CURRENT_DATE
        ORDER BY service_project.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Retrieve details of one service project
const getProjectDetails = async (id) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.project_date AS date,
            service_project.location,
            service_project.organization_id,
            organization.name AS organization_name
        FROM public.service_project
        INNER JOIN public.organization
        ON service_project.organization_id = organization.organization_id
        WHERE service_project.project_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};
// Retrieve all categories belonging to one service project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            category.category_id,
            category.name
        FROM public.category
        INNER JOIN public.project_category
        ON category.category_id = project_category.category_id
        WHERE project_category.project_id = $1
        ORDER BY category.name ASC;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};
// Retrieve all service projects belonging to one category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.project_date
        FROM public.service_project
        INNER JOIN public.project_category
        ON service_project.project_id = project_category.project_id
        WHERE project_category.category_id = $1
        ORDER BY service_project.project_date ASC;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};
// Export the model functions
    export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getCategoriesByProjectId, getProjectsByCategoryId };

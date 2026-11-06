
import db from './db.js'

const getAllProjects = async() => {
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
}

export {getAllProjects}

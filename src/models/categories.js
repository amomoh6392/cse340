import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name ASC;
    `;

    const result = await db.query(query);
    return result.rows;
}
// Retrieve one category by its ID
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // Remove existing category assignments
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    // Add the newly selected categories
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};


export {getAllCategories, getCategoryById, assignCategoryToProject, updateCategoryAssignments};
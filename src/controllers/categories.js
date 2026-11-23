
import { getAllCategories, getCategoryById, updateCategoryAssignments} from '../models/categories.js';

import { getProjectsByCategoryId, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';

const showCategoriesPage = async (req, res, next) => {
   try {
        const categories = await getAllCategories();
        const title = 'Service Categories';

        res.render('categories', { title, categories });
   }catch(error) {
        next(error);
   }
};
// Display details for one category
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        
        const id = req.params.id;

        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        const projects = await getProjectsByCategoryId(id);

        const title = category.name;

        res.render('category', {
            title,
            category,
            projects
        });

    } catch (error) {
        next(error);
    }
};
const showAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        const projectDetails = await getProjectDetails(projectId);
        const categories = await getAllCategories();
        const assignedCategories = await getCategoriesByProjectId(projectId);

        const title = 'Assign Categories to Project';

        res.render('assign-categories', {
            title,
            projectId,
            projectDetails,
            categories,
            assignedCategories
        });

    } catch (error) {
        next(error);
    }
};
const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);

    req.flash('success', 'Categories updated successfully.');

    res.redirect(`/project/${projectId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };

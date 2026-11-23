
import { getAllCategories, getCategoryById, updateCategoryAssignments,updateCategory, createCategory} from '../models/categories.js';

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
// Display the new category form
const buildNewCategory = async (req, res, next) => {
    try {
        res.render('new-category', {
            title: 'Create New Category',
            errors: [],
            name: ''
        });
    } catch (error) {
        next(error);
    }
};
// Process the new category form
const createCategoryController = async (req, res, next) => {
    try {
        const name = req.body.name?.trim() || '';
        const errors = [];

        if (!name) {
            errors.push('Category name is required.');
        } else if (name.length < 3) {
            errors.push('Category name must be at least 3 characters.');
        } else if (name.length > 100) {
            errors.push('Category name cannot exceed 100 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('new-category', {
                title: 'Create New Category',
                errors,
                name
            });
        }

        await createCategory(name);

        req.flash('success', 'Category created successfully.');

        return res.redirect('/categories');

    } catch (error) {
        next(error);
    }
};
// Display the edit category form
const buildEditCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        res.render('edit-category', {
            title: 'Edit Category',
            category,
            errors: []
        });

    } catch (error) {
        next(error);
    }
};
// Process the edit category form
const updateCategoryController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name?.trim() || '';
        const errors = [];

        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        if (!name) {
            errors.push('Category name is required.');
        } else if (name.length < 3) {
            errors.push('Category name must be at least 3 characters.');
        } else if (name.length > 100) {
            errors.push('Category name cannot exceed 100 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('edit-category', {
                title: 'Edit Category',
                category: { ...category, name },
                errors
            });
        }

        await updateCategory(id, name);

        req.flash('success', 'Category updated successfully.');

        return res.redirect('/categories');

    } catch (error) {
        next(error);
    }
};
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, buildNewCategory, createCategoryController, buildEditCategory, updateCategoryController };

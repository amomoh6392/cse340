
import { getAllCategories, getCategoryById } from '../models/categories.js';

import { getProjectsByCategoryId } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};
// Display details for one category
const showCategoryDetailsPage = async (req, res) => {
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
};

export { showCategoriesPage, showCategoryDetailsPage };


import { getAllCategories, getCategoryById } from '../models/categories.js';

import { getProjectsByCategoryId } from '../models/projects.js';

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

export { showCategoriesPage, showCategoryDetailsPage };

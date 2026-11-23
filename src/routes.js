
import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation,showEditOrganizationForm,processEditOrganizationForm } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';


// Create the router
const router = express.Router();

// Define application routes
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route for editing organization page
router.get('/edit-organization/:id', showEditOrganizationForm);
// Error-handling test route
router.get('/test-error', testErrorPage);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Display the new project form
router.get('/new-project', showNewProjectForm);

// Process the new project form
router.post('/new-project', projectValidation, processNewProjectForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
// Export the router
export default router;

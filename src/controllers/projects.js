
import { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId, createProject,updateProject} from '../models/projects.js';

import { getAllOrganizations } from '../models/organizations.js';

import { body, validationResult } from 'express-validator';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display upcoming service projects
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

// Display details for one service project
const showProjectDetailsPage = async (req, res) => {
    const id = req.params.id;

    const project = await getProjectDetails(id);

    const categories = await getCategoriesByProjectId(id);

    const title = 'Project Details';

    res.render('project', {
        title,
        project,
        categories
    });
};
const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Add New Service Project';

    res.render('new-project', {
        title,
        organizations
    });
};
const processNewProjectForm = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }
    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;

    try {
        const newProjectId = await createProject(
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash(
            'success',
            'New service project created successfully!'
        );

        res.redirect(`/project/${newProjectId}`);

    } catch (error) {
        console.error('Error creating new project:', error);

        req.flash(
            'error',
            'There was an error creating the service project.'
        );

        res.redirect('/new-project');
    }
};

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.')
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters.'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.')
        .isLength({ max: 200 })
        .withMessage('Location cannot exceed 200 characters.'),

    body('date')
        .notEmpty()
        .withMessage('Project date is required.')
        .isISO8601()
        .withMessage('Please enter a valid project date.'),

    body('organizationId')
        .notEmpty()
        .withMessage('Please select an organization.')
        .isInt()
        .withMessage('Please select a valid organization.')
];
// Display the Edit Project form
const showEditProjectForm = async (req, res) => {
    const project_id = req.params.id

    const project = await getProjectDetails(project_id)
    const organizations = await getAllOrganizations()

    res.render("edit-project", {
        title: "Edit Service Project",
        project,
        organizations
    })
}
// Process the Edit Project form
const processEditProjectForm = async (req, res) => {
    const project_id = req.params.id

    const {
        organization_id,
        title,
        description,
        location,
        project_date
    } = req.body

    await updateProject(
        project_id,
        organization_id,
        title,
        description,
        location,
        project_date
    )

    req.flash("notice", "Project updated successfully.")

    res.redirect(`/project/${project_id}`)
}

export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm };

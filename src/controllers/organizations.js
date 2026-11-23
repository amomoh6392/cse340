
// Import the model function
import { getAllOrganizations, getOrganizationDetails, createOrganization, updateOrganization } from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

import { body, validationResult } from 'express-validator';
// Define the controller function, Display all organizations
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

// Validation and sanitization rules
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters')
        .escape(),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters')
        .escape(),

    body('contactEmail')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
];

// Display details for one organization
const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;

    const organizationDetails = await getOrganizationDetails(organizationId);

    const projects = await getProjectsByOrganizationId(organizationId);

    const title = 'Organization Details';

    res.render('organization', {
        title,
        organizationDetails,
        projects
    });
};

const showEditOrganizationForm = async (req, res) => {
    const organizationId = req.params.id;

    const organizationDetails = await getOrganizationDetails(organizationId);

    const title = 'Edit Organization';

    res.render('edit-organization', {
        title,
        organizationDetails,
    });
};
const processEditOrganizationForm = async (req, res) => {

    // Check for validation errors
    const results = validationResult(req);

    if (!results.isEmpty()) {

        // Display validation errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Return to the edit organization form
        return res.redirect('/edit-organization/' + req.params.id);
    }

    // Get organization ID
    const organizationId = req.params.id;

    // Get submitted form information
    const {
        name,
        description,
        contactEmail,
        logoFilename
    } = req.body;

    // Update organization in the database
    await updateOrganization(
        organizationId,
        name,
        description,
        contactEmail,
        logoFilename
    );

    // Display success message
    req.flash('success', 'Organization updated successfully!');

    // Redirect to organization details
    res.redirect(`/organization/${organizationId}`);
};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};



const processNewOrganizationForm = async (req, res) => {
    // Check validation results
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-organization');
    }

    try {
        const { name, description, contactEmail } = req.body;

        const logoFilename = 'placeholder-logo.png';

        const organizationId = await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

        req.flash('success', 'Organization added successfully!');

        res.redirect(`/organization/${organizationId}`);

    } catch (error) {
        console.error('Error creating organization:', error);

        req.flash('error', 'Something went wrong while creating the organization.');

        res.redirect('/new-organization');
    }
};


// Export the controller function
export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm };

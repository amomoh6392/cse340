
// Import the model function
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

// Define the controller function, Display all organizations
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

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
// Export the controller function
export { showOrganizationsPage, showOrganizationDetailsPage };


// Import the model function
import { getAllOrganizations } from '../models/organizations.js';

// Define the controller function
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

// Export the controller function
export { showOrganizationsPage };

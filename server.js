import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));


/**
 * Routes
 */
app.get('/', async (req, res) => {
    const title = 'Home page for Abinadi Momoh';
    res.render('home', { title });
});


app.get('/projects', async (req, res) => {
    console.log('PROJECTS ROUTE WAS CALLED');

    try {
        const projects = await getAllProjects();

        console.log('Service Projects:', projects);
        console.log('Number of projects:', projects.length);

        return res.render('projects', {
            title: 'Service Projects',
            projects: projects
        });

    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).send('Unable to retrieve service projects.');
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();

        return res.render('categories', {
            title: 'Service Categories',
            categories: categories
        });

    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).send('Unable to retrieve categories.');
    }
});
app.get('/organizations', async (req, res) => {
  console.log('ORGANIZATIONS ROUTE WAS CALLED');
    try {
        const organizations = await getAllOrganizations();

        console.log('Organizations:', organizations);
        console.log('Number of organizations:', organizations.length);

        return res.render('organizations', {
            title: 'Our Partner Organizations',
            organizations: organizations
        });

    } catch (error) {
        console.error('Error retrieving organizations:', error);
        res.status(500).send('Unable to retrieve organizations.');
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});



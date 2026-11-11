
import { getUpcomingProjects, getProjectDetails, getCategoriesByProjectId} from '../models/projects.js';

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

export { showProjectsPage, showProjectDetailsPage };

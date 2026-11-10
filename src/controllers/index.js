
// Import any needed model functions
// None are needed for the home page.

// Define the controller function
const showHomePage = async (req, res) => {
    const title = 'Home';

    res.render('home', { title });
};

// Export the controller function
export { showHomePage };


-- ========================================
-- CSE 340: Organization Table Setup
-- ========================================

-- Create the organization table
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- ========================================
-- Verify the inserted organizations
-- ========================================

SELECT * FROM organization
ORDER BY organization_id;


-- =========================================
-- SERVICE PROJECT TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS public.service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES public.organization(organization_id)
);

-- =========================================
-- INSERT SERVICE PROJECTS
-- =========================================

-- BrightFuture Builders (Organization ID: 1)

INSERT INTO public.service_project
(organization_id, title, description, location, project_date)
VALUES
(1, 'Community School Renovation',
 'Renovating classrooms and improving school facilities.',
 'Lagos, Nigeria', '2026-11-15'),

(1, 'Youth Mentorship Program',
 'Providing career guidance and mentorship to young people.',
 'Warri, Nigeria', '2026-11-20'),

(1, 'Free Skills Training',
 'Teaching young adults practical vocational skills.',
 'Benin City, Nigeria', '2026-11-25'),

(1, 'Community Library Project',
 'Building a community library and providing learning materials.',
 'Asaba, Nigeria', '2026-12-01'),

(1, 'Children Education Support',
 'Providing educational supplies to children in underserved communities.',
 'Ughelli, Nigeria', '2026-12-05');


-- GreenHarvest Growers (Organization ID: 2)

INSERT INTO public.service_project
(organization_id, title, description, location, project_date)
VALUES
(2, 'Community Garden Project',
 'Creating community gardens to encourage local food production.',
 'Lagos, Nigeria', '2026-11-16'),

(2, 'Tree Planting Campaign',
 'Planting trees to improve the environment.',
 'Asaba, Nigeria', '2026-11-22'),

(2, 'Sustainable Farming Workshop',
 'Training farmers in sustainable agricultural practices.',
 'Delta State, Nigeria', '2026-11-27'),

(2, 'Clean Water Awareness',
 'Educating communities about clean water and sanitation.',
 'Warri, Nigeria', '2026-12-02'),

(2, 'Food Security Initiative',
 'Supporting local farmers and families with agricultural resources.',
 'Abraka, Nigeria', '2026-12-07');


-- UnityServe Volunteers (Organization ID: 3)

INSERT INTO public.service_project
(organization_id, title, description, location, project_date)
VALUES
(3, 'Neighborhood Cleanup',
 'Organizing volunteers to clean streets and public spaces.',
 'Warri, Nigeria', '2026-11-17'),

(3, 'Elderly Care Outreach',
 'Visiting and supporting elderly members of the community.',
 'Ughelli, Nigeria', '2026-11-23'),

(3, 'Hospital Volunteer Program',
 'Providing volunteer assistance to local healthcare facilities.',
 'Benin City, Nigeria', '2026-11-28'),

(3, 'Food Donation Drive',
 'Collecting and distributing food to families in need.',
 'Lagos, Nigeria', '2026-12-03'),

(3, 'Community Health Awareness',
 'Organizing health education and awareness activities.',
 'Asaba, Nigeria', '2026-12-08');

CREATE TABLE public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE public.project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES public.service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES public.category(category_id)
        ON DELETE CASCADE
);

INSERT INTO public.category (name)
VALUES
    ('Community Cleanup'),
    ('Education and Mentoring'),
    ('Food and Basic Needs');

SELECT project_id, title
FROM public.service_project
ORDER BY project_id;
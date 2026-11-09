-- Create the organization table
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- Insert sample organizations
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


SELECT * FROM organization
ORDER BY organization_id;

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

CREATE TABLE public.service_project (
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

SELECT organization_id, COUNT(*) AS total_projects
FROM public.service_project
GROUP BY organization_id
ORDER BY organization_id;

SELECT
    sp.project_id,
    sp.title,
    sp.description,
    sp.location,
    sp.project_date,
    o.name AS organization_name
FROM public.service_project sp
INNER JOIN public.organization o
    ON sp.organization_id = o.organization_id
ORDER BY sp.project_date;

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




INSERT INTO public.project_category (project_id, category_id)
SELECT sp.project_id, c.category_id
FROM public.service_project sp
CROSS JOIN public.category c
WHERE
    (sp.title IN (
        'Neighborhood Cleanup',
        'Tree Planting Campaign'
    ) AND c.name = 'Community Cleanup')

    OR

    (sp.title IN (
        'Community School Renovation',
        'Youth Mentorship Program',
        'Free Skills Training',
        'Community Library Project',
        'Children Education Support',
        'Sustainable Farming Workshop',
        'Clean Water Awareness',
        'Community Health Awareness'
    ) AND c.name = 'Education and Mentoring')

    OR

    (sp.title IN (
        'Community Garden Project',
        'Food Security Initiative',
        'Food Donation Drive',
        'Elderly Care Outreach',
        'Hospital Volunteer Program'
    ) AND c.name = 'Food and Basic Needs')

ON CONFLICT (project_id, category_id) DO NOTHING;

-- =========================================
-- VERIFY PROJECT-CATEGORY RELATIONSHIPS
-- =========================================

SELECT
    sp.project_id,
    sp.title AS project_title,
    c.category_id,
    c.name AS category_name
FROM public.project_category pc
INNER JOIN public.service_project sp
    ON pc.project_id = sp.project_id
INNER JOIN public.category c
    ON pc.category_id = c.category_id
ORDER BY sp.project_id;

-- Check projects without categories
SELECT sp.project_id, sp.title
FROM public.service_project sp
LEFT JOIN public.project_category pc
    ON sp.project_id = pc.project_id
WHERE pc.project_id IS NULL;


-- =========================================
-- COUNT ALL DATABASE RECORDS
-- =========================================

SELECT
    (SELECT COUNT(*) FROM public.organization)
        AS total_organizations,

    (SELECT COUNT(*) FROM public.service_project)
        AS total_projects,

    (SELECT COUNT(*) FROM public.category)
        AS total_categories,

    (SELECT COUNT(*) FROM public.project_category)
        AS total_category_assignments;
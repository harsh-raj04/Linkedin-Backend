// Seed script to add dummy users to the database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const User = require('./models/User.model');

// Dummy users data
const dummyUsers = [
    {
        username: 'sarahjohnson',
        email: 'sarah.johnson@example.com',
        password: 'password123',
        headline: 'Product Manager at Tech Corp',
        bio: 'Passionate about building products that make a difference. 10+ years in tech.',
        location: 'San Francisco, CA',
        connections: 500,
        experience: [{
            title: 'Senior Product Manager',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            startDate: 'Jan 2022',
            endDate: 'Present',
            current: true,
            description: 'Leading product strategy for enterprise solutions'
        }],
        education: [{
            school: 'Stanford University',
            degree: 'MBA',
            field: 'Business Administration',
            startYear: '2015',
            endYear: '2017'
        }],
        skills: ['Product Management', 'Strategy', 'Agile', 'User Research', 'Data Analysis']
    },
    {
        username: 'michaelchen',
        email: 'michael.chen@example.com',
        password: 'password123',
        headline: 'Software Engineer at InnovateLabs',
        bio: 'Full-stack developer passionate about creating scalable solutions.',
        location: 'Seattle, WA',
        connections: 350,
        experience: [{
            title: 'Senior Software Engineer',
            company: 'InnovateLabs',
            location: 'Seattle, WA',
            startDate: 'Mar 2021',
            endDate: 'Present',
            current: true,
            description: 'Building cloud-native applications'
        }],
        education: [{
            school: 'MIT',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startYear: '2015',
            endYear: '2019'
        }],
        skills: ['React', 'Node.js', 'AWS', 'MongoDB', 'Docker']
    },
    {
        username: 'emilyrodriguez',
        email: 'emily.rodriguez@example.com',
        password: 'password123',
        headline: 'UX Designer at Creative Studio',
        bio: 'Designing beautiful and intuitive user experiences.',
        location: 'Austin, TX',
        connections: 420,
        experience: [{
            title: 'Senior UX Designer',
            company: 'Creative Studio',
            location: 'Austin, TX',
            startDate: 'Jun 2020',
            endDate: 'Present',
            current: true,
            description: 'Leading design projects for major clients'
        }],
        education: [{
            school: 'Parsons School of Design',
            degree: 'BFA',
            field: 'Design',
            startYear: '2014',
            endYear: '2018'
        }],
        skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'User Research', 'Prototyping']
    },
    {
        username: 'davidkim',
        email: 'david.kim@example.com',
        password: 'password123',
        headline: 'Data Scientist at Analytics Pro',
        bio: 'Turning data into actionable insights.',
        location: 'New York, NY',
        connections: 380,
        experience: [{
            title: 'Lead Data Scientist',
            company: 'Analytics Pro',
            location: 'New York, NY',
            startDate: 'Feb 2021',
            endDate: 'Present',
            current: true,
            description: 'Building ML models for business intelligence'
        }],
        education: [{
            school: 'Carnegie Mellon University',
            degree: 'MS',
            field: 'Data Science',
            startYear: '2017',
            endYear: '2019'
        }],
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Visualization']
    },
    {
        username: 'jessicawang',
        email: 'jessica.wang@example.com',
        password: 'password123',
        headline: 'Marketing Director at Brand Solutions',
        bio: 'Strategic marketing professional with a passion for brand storytelling.',
        location: 'Los Angeles, CA',
        connections: 650,
        experience: [{
            title: 'Marketing Director',
            company: 'Brand Solutions',
            location: 'Los Angeles, CA',
            startDate: 'Jan 2020',
            endDate: 'Present',
            current: true,
            description: 'Leading marketing initiatives and brand strategy'
        }],
        education: [{
            school: 'UCLA',
            degree: 'Bachelor of Arts',
            field: 'Marketing',
            startYear: '2012',
            endYear: '2016'
        }],
        skills: ['Digital Marketing', 'Brand Strategy', 'Content Marketing', 'SEO', 'Analytics']
    },
    {
        username: 'robertsmith',
        email: 'robert.smith@example.com',
        password: 'password123',
        headline: 'DevOps Engineer at Cloud Systems',
        bio: 'Infrastructure automation and cloud architecture specialist.',
        location: 'Boston, MA',
        connections: 290,
        experience: [{
            title: 'Senior DevOps Engineer',
            company: 'Cloud Systems',
            location: 'Boston, MA',
            startDate: 'May 2021',
            endDate: 'Present',
            current: true,
            description: 'Managing cloud infrastructure and CI/CD pipelines'
        }],
        education: [{
            school: 'Georgia Tech',
            degree: 'BS',
            field: 'Computer Engineering',
            startYear: '2014',
            endYear: '2018'
        }],
        skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins']
    },
    {
        username: 'lisaanderson',
        email: 'lisa.anderson@example.com',
        password: 'password123',
        headline: 'HR Manager at PeopleFirst Inc',
        bio: 'Building great teams and fostering positive work cultures.',
        location: 'Chicago, IL',
        connections: 540,
        experience: [{
            title: 'HR Manager',
            company: 'PeopleFirst Inc',
            location: 'Chicago, IL',
            startDate: 'Aug 2019',
            endDate: 'Present',
            current: true,
            description: 'Managing talent acquisition and employee development'
        }],
        education: [{
            school: 'Northwestern University',
            degree: 'MA',
            field: 'Human Resources',
            startYear: '2015',
            endYear: '2017'
        }],
        skills: ['Talent Acquisition', 'Employee Relations', 'Training', 'HR Strategy', 'Leadership']
    },
    {
        username: 'jameslee',
        email: 'james.lee@example.com',
        password: 'password123',
        headline: 'Financial Analyst at Investment Group',
        bio: 'Analyzing markets and helping clients achieve their financial goals.',
        location: 'Charlotte, NC',
        connections: 310,
        experience: [{
            title: 'Senior Financial Analyst',
            company: 'Investment Group',
            location: 'Charlotte, NC',
            startDate: 'Apr 2020',
            endDate: 'Present',
            current: true,
            description: 'Providing financial analysis and investment recommendations'
        }],
        education: [{
            school: 'Duke University',
            degree: 'Bachelor of Science',
            field: 'Finance',
            startYear: '2014',
            endYear: '2018'
        }],
        skills: ['Financial Analysis', 'Excel', 'Bloomberg Terminal', 'Risk Management', 'Portfolio Management']
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Update existing users with detailed information
        for (const userData of dummyUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            await User.findOneAndUpdate(
                { email: userData.email },
                {
                    username: userData.username,
                    password: hashedPassword,
                    headline: userData.headline,
                    bio: userData.bio,
                    location: userData.location,
                    connections: userData.connections,
                    experience: userData.experience,
                    education: userData.education,
                    skills: userData.skills,
                    lastLogin: new Date()
                },
                { upsert: true, new: true }
            );
        }

        console.log(`✅ Successfully updated ${dummyUsers.length} users with detailed profiles`);

        // Display the users
        console.log('\nDummy Users with Details:');
        dummyUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.username} - ${user.headline}`);
        });

        console.log('\n📌 You can use any of these credentials to login:');
        console.log('   Email: Any email from above');
        console.log('   Password: password123');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    }
}

// Run the seed function
seedDatabase();

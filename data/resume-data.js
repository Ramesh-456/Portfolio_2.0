const RESUME_DATA = {
  personal: {
    name: 'Ramesh S',
    title: 'Full Stack Developer',
    phone: '+91 6379159249',
    email: 'rameshsgbm456@gmail.com',
    experience: '3.6 Years',
    location: 'Chennai, India'
  },
  hero: {
    heading: {
      desktop: 'Building secure finance platforms across Angular and Spring Boot.',
      mobile: 'Angular and Spring Boot for secure finance platforms.'
    },
    summary:
      'Full stack developer with hands-on delivery across Angular frontend development and Java Spring Boot backend services, building secure finance, trading, and digital lending platforms.',
    metrics: [
      { value: '3.6+', label: 'Years building production apps' },
      { value: '2', label: 'Finance platforms delivered' },
      { value: 'Angular + Java', label: 'Balanced frontend and backend ownership' }
    ]
  },
  profile:
    'I build end-to-end web applications with equal focus on Angular frontend delivery and Java Spring Boot backend engineering. My recent work includes secure APIs, microservices, reusable UI components, performance improvements, third-party integrations, and product delivery inside Agile teams.',
  education: {
    degree: 'B.E. Mechanical Engineering',
    college: 'Government College of Engineering, Salem',
    year: '2018 - 2022'
  },
  skills: {
    frontend: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'PrimeNG', 'Tailwind'],
    backend: ['Java', 'Spring Boot', 'Microservices', 'JPA / Hibernate', 'Spring Security', 'Node.js', 'REST APIs'],
    cloud: ['AWS Lambda', 'AWS S3', 'Docker', 'API Gateway', 'Redis', 'Kubernetes'],
    data: ['PostgreSQL', 'MySQL', 'SQL Optimization', 'WebSocket / STOMP', 'JWT Auth'],
    tools: ['Git', 'GitHub', 'JIRA', 'Jenkins', 'Visual Studio Code', 'STS', 'Eclipse']
  },
  signals: [
    { value: 'Full stack delivery', label: 'Built both Angular user flows and Spring Boot service integrations' },
    { value: 'Finance domain', label: 'Experience in lending and trading products with secure workflows' },
    { value: 'Microservices', label: 'Practical backend ownership across APIs, authentication, and integrations' },
    { value: 'Agile delivery', label: 'Comfortable with estimation, reviews, debugging, demos, and support' }
  ],
  experience: [
    {
      company: 'BMW TechWorks India Pvt Ltd, Chennai',
      logo: { src: 'data/logos/bmw-logo.png', alt: 'BMW logo', shape: 'circle' },
      role: 'Senior Associate',
      duration: 'Feb 2026 - Present',
      project: 'BMW Financial Services',
      description:
        'Contributing to a secure digital automotive financing platform that guides customers from application to loan-status tracking through responsive, API-driven workflows.',
      responsibilities: [
        'Built responsive Angular features with TypeScript, RxJS, and ng-zorro-antd for finance application journeys.',
        'Connected UI flows with Spring Boot microservices and REST endpoints for application processing.',
        'Integrated AWS Lambda and third-party services for verification and finance workflow automation.',
        'Improved maintainability through reusable components, lazy-loaded modules, and performance-focused refactors.',
        'Used Docker-based local environments for validation, debugging, and developer collaboration.'
      ],
      techStack: ['Angular','Spring Boot', 'Java','NodeJS', 'TypeScript', 'RxJS', 'Redis', 'AWS Lambda', 'API Gateway', 'PostgreSQL', 'Docker', 'Kubernetes','ng-zorro-antd'],
      caseStudy: {
        title: 'Digital Lending Platform',
        summary: 'Full stack contribution across Angular workflows and Spring Boot-backed finance services where clarity, security, and reliability all mattered.',
        bullets: [
          'Built Angular-based finance journeys that made multi-step customer flows easier to use.',
          'Connected UI modules with Spring Boot services and integrations for loan-processing workflows.',
          'Improved maintainability through reusable frontend modules and stable backend integration points.'
        ]
      }
    },
    {
      company: 'Sysveda Information Technology Pvt Ltd, Chennai',
      logo: { src: 'data/logos/sysveda-logo.png', alt: 'Sysveda logo' },
      role: 'Software Engineer',
      duration: 'Feb 2023 - Feb 2026',
      project: 'Adviser Portal',
      client: 'AUSIEX, Grove Securities, Equity and Super - Private Asset Management - Australia',
      description:
        'Built features for secure trading and adviser platforms supporting portfolio management, research access, notifications, and market-facing dashboards.',
      responsibilities: [
        'Developed Spring Boot microservices with JPA and Hibernate for trading-related business workflows.',
        'Implemented JWT-based authentication and authorization using Spring Security.',
        'Enabled real-time notifications using WebSocket, STOMP, and Redis Pub/Sub.',
        'Optimized performance through asynchronous processing and SQL query improvements.',
        'Upgraded Angular applications from v15 to v19 and delivered reusable UI components, theming, and dashboard experiences.'
      ],
      techStack: ['Java 11', 'Spring Boot', 'Spring Security', 'Angular', 'React', 'Redis', 'PostgreSQL', 'NodeJS', 'Jenkins', 'PrimeNG'],
      caseStudy: {
        title: 'Adviser & Trading Portal',
        summary: 'End-to-end engineering inside a financial platform covering Angular modernization, Spring Boot services, security, and live updates.',
        bullets: [
          'Worked across Angular screens and Spring Boot services to keep adviser workflows fast and secure.',
          'Modernized Angular applications while maintaining stability in a regulated product environment.',
          'Contributed to authentication, notification, and dashboard layers across the full stack.'
        ]
      }
    }
  ],
  languages: ['English', 'Tamil'],
  workflow: [
    'Daily stand-ups and sprint planning',
    'Task estimation and backlog refinement',
    'UI implementation and service integration',
    'Code reviews and collaborative debugging',
    'Sprint demos, retrospectives, and production support',
    'Documentation and knowledge sharing'
  ]
};

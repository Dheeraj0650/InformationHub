# Information Hub

Information Hub is a powerful full stack application that aggregates data from various REST API services and presents it seamlessly in a user-friendly interface. Say goodbye to dealing with API keys and code intricacies; Information Hub simplifies the process for you. It currently integrates with a range of services, including Movies API, Weather API, NASA API, Realtime Board, and more.

## Technology Stack

- **Frontend:** Developed using React.js and hosted on AWS EC2, ensuring a responsive and dynamic user experience.
- **Backend:** Powered by Node.js for efficient data processing and API communication.
- **Database:** MongoDB is used for storing and managing data.
- **Security:** NGINX is employed for network security and load balancing, enhancing the application's robustness.
- **CI/CD:** Jenkins is used for continuous integration and continuous deployment, ensuring a smooth development and deployment pipeline.
- **Containerization:** The application is dockerized within a container, providing consistency across different environments.
- **Real-time Communication:** Utilizes Socket.io for seamless real-time communication and collaboration features.
- **Resilience:** The system is designed to automatically restart all services even after system reboots, ensuring uninterrupted operation.

## CI/CD with Jenkins

Continuous Integration and Continuous Deployment (CI/CD) are vital components of our development workflow. Jenkins, our CI/CD tool, automates the building, testing, and deployment of the application. This ensures that new features and fixes are quickly and reliably deployed to production.

The CI/CD pipeline typically includes the following stages:
- Code is automatically built and tested whenever changes are pushed to the repository.
- After successful testing, the application is deployed to the staging environment for further validation.
- Once the staging environment is validated, Jenkins deploys the changes to the production environment.

## Workflow

1. **Login/Register**: Users can access the application by registering with a username and password, ensuring personalized experiences.

2. **Vertical Navigation**: The user-friendly vertical navigation bar, accessible by clicking on the arrow on the left, provides quick access to various integrated API services.

3. **Integrated API Services**: Information Hub seamlessly connects to multiple REST APIs, such as Movies, Weather, NASA, Realtime Board, and more, providing users with a wide range of information and functionality.

## Future Enhancements

We have exciting plans for the future of Information Hub, including:

- **Incorporating New REST APIs**: Stay tuned for updates as we plan to integrate additional REST APIs, expanding the range of services and information available through the application.

- **Enhanced UI Features**: We're committed to continuously improving the user experience by introducing new UI features that make interacting with the application even more intuitive and enjoyable.

Join us on this journey as we continue to evolve Information Hub into a comprehensive information resource. Your feedback and contributions are always welcome!

## Getting Started

To get started with Information Hub, follow these steps:

1. Clone this repository to your local machine.
2. Set up the required environment variables, including API keys and configuration parameters.
3. Run the application using the provided instructions in the documentation.

Thank you for choosing Information Hub as your go-to source for a wide range of information and services. If you have any questions or suggestions, please feel free to reach out.

Happy exploring!

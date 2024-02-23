# Aterrizar.com / CheckinFlow Microservice

The CheckinFlow Microservice is responsible for managing the check-in process for passengers in the Aterrizar Punto Com application.

## Purpose

The purpose of the CheckinFlow is to provide a streamlined and efficient check-in experience for passengers. It handles all the necessary steps and validations required for a successful check-in, such as verifying travel documents, assigning seats, and printing boarding passes.


## Setting up


### Install dependencies
Before jumping to the code please first install the dependencies by running:

```bash
 npm install
```

### MAKE SURE YOU HAVE .ENV FILE
After please also create a `.env` file, you can copy the `.env.workflow` file

## Unit Testing

To run the unit tests for the Project, execute the following command:

```bash
npm run test
```

## Integration Testing

To run the integration tests for the Project, follow these steps:

1. Start the required services using Docker Compose. Execute the following command:

   ```bash
   docker-compose up -d

2. Run the command:
   ```bash
   npm run integration

   
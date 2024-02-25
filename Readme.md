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

```bash
cp .env.workflow .env
```

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

# Ways of working

This section serves as a guide to ensure good code quality and collaboration practices within our development environment.

Before You Start Working
Before diving into any coding tasks, it's essential to ensure that you follow these guidelines:

- **Code Quality Assurance:** We prioritize maintaining high code quality standards throughout the project. Please adhere to best practices and coding conventions outlined in our style guide, Make sure you have enabled the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in your editor.

- **Testing:** Write comprehensive tests for all new features and ensure that existing tests remain passing. Test-driven development (TDD) is encouraged to promote reliability and stability in the codebase.

## Commit Guidelines
When making commits, please follow these guidelines:

- **Format**: Commits follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) conventions followed by a Ticket number.
   For example if your ticket is TS123 then your commit would look like:
   ```
   feat: describe your changes (TS123)
   ```
   Allowed prefixes are:
   - `feat`: for a new feature for the user.
   - `fix`: for a bug fix for the user, not a fix to a build script.
   - `chore`: Changes to t auxiliary tools and libraries such as documentation generation
   - `ci`: Changes to CI/CD tools such as jenkins or github actions.
   - `docs`: for changes to the documentation.
   - `style`: for formatting changes, missing semicolons, etc (NOT CSS).
   - `refactor`: for refactoring production code, e.g. renaming a variable.
   - `perf`: for performance improvements.
   - `test`: for adding missing tests, refactoring tests; no production code change.
   - `build`: [RESERVED FOR RELEASES] for deploying new builds.

- **Atomic Commits:** Keep commits focused on a single logical change. Avoid bundling unrelated changes within a single commit.

## Pull Request Guidelines
When creating a pull request, adhere to the following guidelines:

- **Single Commit:** Is desired that each pull request contains __**only one commit**__. This ensures that the changes are well-segmented and easier to review. Only in extreme cases where the change is big then is allowed multiple commits

- **Rebase Merge Strategy**: Use the rebase merge strategy when merging your changes into the main branch. This helps maintain a clean and linear commit history. If PR has more than 1 commit use Merge Commit strategy

- **Review and Approval:** Every pull request should have at least two approvals from team members before it can be merged. Peer review is crucial for maintaining code quality and knowledge sharing.

## Testing
All code changes must pass the existing test suite. Additionally, ensure that new code is accompanied by relevant tests to cover both positive and edge cases.




# Angular NgNeat Query V2 Demo

A simple demo to show how to use the Angular NgNeat Query v2 library

## Installation

1. Clone the repository and install the dependencies
    ```bash
    npm i --legacy-peer-deps
    ```
2. Open new terminal and run the following command to start the `json-server`

     ```bash
     npx json-server --watch db.json
     ```

3. Open the browser and navigate to `http://localhost:3000/posts` to list of available endpoints. Go
   to http://localhost:3000/employees to see the employees' data.

4. Run the application by executing the following command
    ```bash
    npm run start
    ```
5. Open the browser and navigate to `http://localhost:4200`

6. You can create new employee by clicking on the `Add Employee` button and fill the form. And you can
   update the employee by clicking on the `Edit` button. All the changes will be saved in the `db.json` file.

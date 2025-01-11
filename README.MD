# Instructions to Clone and Run the BPIMS-CRUD Project

Thank you for reviewing my project! Below are the steps to clone and run the BPIMS-CRUD project, which consists of a React frontend and an Express backend.
1. Clone the Repository

Start by cloning the project repository to your local machine. Open your terminal and run:

``` 
git clone https://github.com/jejester/BPIMS-CRUD.git 
```

Navigate to the project directory:

``` 
cd BPIMS-CRUD
```

2. Set Up the Backend (Express)
a. Install Dependencies

In the project directory, navigate to the backend folder and install the necessary backend dependencies:

```
cd backend
npm install
```

b. Set Up Environment Variables

Ensure that your environment variables are set up for the Express server. You can create a `.env` file in the backend folder and add the necessary configuration. For example:

```
PORT=5000
```
c. Run the Backend

Once the dependencies are installed, you can start the Express server:

```
npm start
```

The backend should now be running on http://localhost:5000.

3. Set Up the Frontend (React)
a. Navigate to the Frontend Directory

Go back to the project root and navigate to the frontend directory:

```
cd ../frontend
```

b. Install Dependencies

In the frontend folder, install the necessary dependencies:

```
npm install
```

c. Run the Frontend

Once the dependencies are installed, you can start the React development server:

```
npm run dev
```

The frontend should now be running on http://localhost:3000.
4. Access the Application

    Open your browser and visit http://localhost:3000 to see the React application.
    The React app will make API requests to http://localhost:5000 for backend functionality.

# Micro-Frontend Task Management Application

## Overview
This repository demonstrates a **Task Management Application** built using the **Micro-Frontend (MFE)** architecture. The application integrates both Angular and React micro-applications within a single host container.

### Architecture Summary
The application consists of **three micro-applications**:
1. **angular-container** (Port: `4200`) - Acts as the host/container.
2. **angular-mfe** (Port: `4201`) - A micro-application developed in Angular.
3. **react-mfe** (Port: `4204`) - A micro-application developed in React.

The **angular-container** serves as the primary entry point and includes a **shared Redux store** for communication between all micro-applications. Authentication is handled by the **angular-mfe**, and tasks (add, edit, view) are managed collaboratively across Angular and React components.

---

## Features
1. **State Sharing**: A shared Redux store enables state communication across all micro-applications.
2. **Component Integration**:
   - React components are integrated into the Angular container as **web components**.
   - Angular components are also utilized seamlessly.
3. **Communication Mechanisms**:
   - **Parent-to-Child**
   - **Child-to-Parent**
   - **Sibling-to-Sibling**
4. **Standalone Routing**:
   - React micro-app (`react-mfe`) can run independently as a separate route (`/react`) within the Angular container.
5. **Task Management**:
   - Add, edit, and view tasks.
   - Task form is provided by **react-mfe**.
   - Task list (cards) is also managed by the **React micro-app**.

---

## Setup Instructions
Follow these steps to run the application locally:

### Prerequisites
- **Node.js** (v14+ recommended)
- **npm** or **yarn**

### Clone the Repository
```bash
git clone https://www.github.com/manish325/microfrontend
cd micro-frontend
```

### Install Dependencies
Install dependencies for all three applications:

#### 1. Angular Container (Host)
```bash
cd angular-container
npm install
```

#### 2. Angular Micro-Frontend
```bash
cd ../angular-mfe
npm install
```

#### 3. React Micro-Frontend
```bash
cd ../react-mfe
npm install
```

### Run Applications
Run each micro-application in separate terminal windows.

#### 1. Start Angular Container
```bash
cd angular-container
npm start
```
Access at: [http://localhost:4200](http://localhost:4200)

#### 2. Start Angular Micro-Frontend
```bash
cd ../angular-mfe
npm start
```
Access at: [http://localhost:4201](http://localhost:4201)

#### 3. Start React Micro-Frontend
```bash
cd ../react-mfe
npm start
```
Access at: [http://localhost:4204](http://localhost:4204)

---

## Application Flow
1. **Authentication**:
   - Upon starting the **angular-container** app, the `angular-mfe` micro-app handles user login.
   - Credentials for testing:
     - **Email**: `dummy@gmail.com`
     - **Password**: `dummy`
   - After successful login, user data is dispatched to the shared **Redux store**.
2. **Dashboard**:
   - The **container app** loads the **dashboard module** once authentication succeeds.
   - The **angular-mfe** provides the **Header** component to welcome the user.
   - Below the header, two sections are displayed:
     - **Add Task**:
       - Opens a dialog from the container app.
       - Uses a **task form** provided by the **react-mfe**.
       - Form emits the added task back to the container, updating the task list.
     - **Task List**:
       - Displays task cards, provided by the **react-mfe**.
       - Allows editing tasks via the same form (pre-filled).
3. **Standalone Route**:
   - React micro-app can run independently at [http://localhost:4200/react](http://localhost:4200/react).

---

## Implementation Notes
- **Web Components**: Components are exposed as **web components** to enable integration across Angular and React.
- **JSON Pipe in Angular**:
   - References cannot be passed as props due to security restrictions.
   - Data is passed and received using the **JSON pipe**.
- **Event Emission**:
   - React components emit events to communicate with the Angular container.
   - Traditional callback systems are used where applicable.

---

## Covered Use Cases
1. **State Sharing**: Shared Redux store as the single source of truth.
2. **Component Integration**: Smooth integration of React and Angular components.
3. **Communication**:
   - Parent-to-Child
   - Child-to-Parent
   - Sibling-to-Sibling
4. **Task Management**: Add, edit, and display tasks.
5. **Standalone Routing**: React micro-app runs as an independent module.

---

## Suggestions for Improvement
- Validate additional use cases like:
   - Dynamic loading of micro-applications.
   - Performance optimization for larger datasets.
   - Role-based access control for tasks.
- Implement comprehensive error handling for the micro-apps.

---

## Credentials
Use the following test credentials for login:
- **Email**: `dummy@gmail.com`
- **Password**: `dummy`

---

## Repository
Access the repository here: [Micro-Frontend GitLab Repository](https://www.github.com/manish325/microfrontend)

---

## Ports Overview
| Application        | Description       | Port  |
|--------------------|-------------------|-------|
| Angular Container  | Host Application  | 4200  |
| Angular MFE        | Angular Micro-App | 4201  |
| React MFE          | React Micro-App   | 4204  |


---

## Contact
For any queries or suggestions, feel free to reach out!

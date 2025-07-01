# Ship Maintenance Dashboard - ENTNT Assignment

A responsive and feature-rich Ship Maintenance Dashboard built with *React* for managing ships, components, and maintenance jobs. This simulation uses *localStorage* for all data persistence.

## For features
Use a desktop site in any browser for complete website 


## 🌐 Deployed Link
https://ship-management-frontend-git-main-jay-patels-projects-21397060.vercel.app/

## 💻 GitHub Repository

https://github.com/Jaypatel0924/Ship-Management-Frontend.git

---

## 📄 Features

### 🛎 User Authentication (Simulated)

* Hardcoded users with roles: *Admin, **Inspector, **Engineer*
* Login with email/password
* Session persistence via localStorage
* Role-based access control (frontend-only)

### 🚢 Ships Management

* List, Add, Edit, and Delete Ships
* View detailed Ship Profile (General Info, Maintenance History, Components)

### ⚖ Components Management

* Manage ship components (Add, Edit, Delete)
* Details include: Name, Serial No, Install Date, Last Maintenance Date

### ⚒ Maintenance Jobs

* Create & Assign Jobs to Engineers
* Job fields: Type, Priority, Status, Scheduled Date, Engineer
* Filter by Ship, Status, Priority
* Update Job status (Open ➔ In Progress ➔ Completed)

### 📅 Maintenance Calendar

* Monthly/Weekly calendar view
* Click any date to view scheduled jobs

### 📢 Notification Center

* In-app notifications for: Job Created, Updated, Completed
* Dismissible alert-style notifications

### 📊 KPI Dashboard

* Cards & charts for:

  * Total Ships
  * Overdue Maintenance Components
  * Jobs In Progress / Completed

### 📁 Data Persistence

* All data stored in and retrieved from localStorage

### 📝 Additional Highlights

* Clean, responsive UI (Mobile/Tablet/Desktop)
* Smooth animations using Framer Motion
* Form validation + user-friendly feedback
* Organized folder structure & reusable components

---



---

## 🛠 Tech Stack & Tools

* *React* with Hooks (functional components)
* *React Router DOM* for navigation
* *Context API* for global state
* *TailwindCSS* for styling
* *Framer Motion* for animations
* *localStorage* for persistent data simulation

---

## 📅 Mock Data Format

See mockData.json or initial localStorage setup:

json
{
  "users": [
    { "id": "1", "role": "Admin", "email": "admin@entnt.in", "password": "admin123" },
    { "id": "2", "role": "Inspector", "email": "inspector@entnt.in", "password": "inspect123" },
    { "id": "3", "role": "Engineer", "email": "engineer@entnt.in", "password": "engine123" }
  ],
  "ships": [...],
  "components": [...],
  "jobs": [...]
}


---

## 📊 KPIs Dashboard Example

* *Total Ships:* 2
* *Overdue Components:* 1
* *Jobs In Progress:* 3
* *Completed Jobs:* 5
* [Chart.js](https://www.chartjs.org/) used for visual graphs (if required)

---

## 🌍 Deployment

* Hosted on *[Vercel](https://ship-management-frontend-git-main-jay-patels-projects-21397060.vercel.app/)* 
* Public GitHub repo with all source code and mock data setup

---

## 🚧 Known Issues or Limitations

* No real backend or server (simulation only)
* No email verification or password recovery
* Notifications are in-app only and not persisted
* All is a hard code data not a add really on database

---

## 💡 Technical Decisions

* Used Context API over Redux for simplicity and scope
* Used TailwindCSS for quick responsive UI
* Used Framer Motion for smooth transitions and animations
* Modular components created for each feature (Ships, Jobs, etc.)

---

## 🚀 Getting Started

### 1. Clone Repo

bash
git clone https://github.com/Jaypatel0924/Ship-Management-Frontend.git
cd ship-dashboard


### 2. Install Dependencies

bash
npm install


### 3. Run Locally

bash
npm run dev


---
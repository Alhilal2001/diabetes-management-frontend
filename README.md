
# DiaTrack AI - Frontend

DiaTrack AI is a full-stack diabetes management app frontend built using React and React Router. The application communicates with a Django REST API and supports full CRUD operations for glucose, meals, and activity entries.

## Features

- JWT-based user authentication
- Glucose tracking with visual chart feedback
- Meal and activity tracking
- Password update support in profile page
- Mobile-responsive design
- Modular component architecture

## Technologies Used

- React
- React Router DOM
- Vite
- Chart.js
- Axios
- JWT-decode

## Project Structure

```
src/
├── components/
├── pages/
├── utilities/
├── App.jsx
├── main.jsx
```

## Routing Overview

| Route              | Description                     |
|--------------------|----------------------------------|
| /login             | Login form                       |
| /signup            | Signup form                      |
| /dashboard         | Authenticated dashboard          |
| /glucose           | View glucose entries             |
| /glucose/new       | Add new glucose entry            |
| /glucose/edit/:id  | Edit glucose entry               |
| /meals             | View meals                       |
| /meals/new         | Add new meal                     |
| /meals/:id/edit    | Edit meal                        |
| /activities        | View activities                  |
| /activities/new    | Add new activity                 |
| /activities/:id/edit| Edit activity                   |
| /profile           | View and update user profile     |

## Link to Backend Repo

[Backend GitHub Repository](<your-backend-repo-link>)

## IceBox Features

- Blood sugar prediction using ML integration
- Admin panel for monitoring users
- Email reminders for glucose checks
- Charts with filterable timelines (day, week, month)
- Export data to CSV/PDF
- Multi-language support
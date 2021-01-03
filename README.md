About this project
-Hi there! Welcome to my project, Paws R Us. This project aims to simulate an animal shelter adoption website, built with full CRUD operations and REST API.

Project Stack
Back-end
-Node.js Express
-MongoDB Atlas / Mongoose
-Bcrypt - Password hash
Front-end
-Embedded Javascript (EJS)
-jQuery
-CSS
-Bootstrap v5.0 framework
Third party services
-Cloudinary - Media database
-Multer - Middleware for handling multipart data
Deployed via Heroku
GitHub Repository
Please visit my GitHub here for more insight into this application.

Documentation, features, and technologies
- Overview
User must sign up for a new account and sign in to access certain features
Signed in users can create new data, seed sample data, and delete any and all current documents.
Signed in users can favorite profiles and access the favorites tab
Favorites are account-bound, each user has their own favorites
Pop ups are displayed on the top left with a lifespan of 10 seconds when users create a new account, create, edit, or delete items
Responsive and scales to all window sizes
- Sign up page
Username validation: No symbols / capitalizations, 4-12 characters and at least 1 letter
Password validation: At least 4 characters long
Confirm password validation
User password is hashed via Bcrypt
- Login page
Username and password validation: Data is pulled from the browser and compared to username/password stored in database for match
- Index page
User Panel: Created using bootstrap accordion, allowing signed-in users to create, seed, and delete data
Profile cards: Created using bootstrap cards
Pagination: Created from scratch, allowing up to 8 profiles per page
- Favorites page
Favorite button: Allows users to favorite/unfavorite profiles to add/remove them from the user's favorites page
- Third party apps
Cloudinary: Third party media databased for users to upload their own images
CRUD
- Create page (Create)
Displays form for user input
Text validation to ensure one or more fields are filled
Allows user to upload image via Cloudinary
- Show page (Read)
Displays all schema data passed into each document (profile).
Allows signed-in users to edit / delete the displayed document
- Edit page (Update)
Displays form for user input- fields are filled with document's current information
Image is kept the same if user fails to upload new image
- Delete button (Delete)
Allows signed-in user to delete current document

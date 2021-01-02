        <div id="firstContainer" class="container-fluid" style="max-width: 1100px;">

            <div class="row">
                <div id="headerBar" class="col-sm-6" height: 80px; padding: 0;>
                    <h1 style="height: 80px; font-size: 3.5em; text-align: center; color:#003664">
                        <i class="fas fa-info-square"></i> About
                    </h1>
                </div>

                <div id="headerBar" class="col-sm-6 activeBox"
                    style="height: 80px; padding: 0;background-color: rgb(194, 194, 194)">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="alert alert-info" role="alert">
                        <h3 class="alert-heading">About this project</h3>
                        <p>Hi there! Welcome to my project, Paws R Us. This project aims to simulate an animal
                            shelter
                            adoption website, built with full CRUD operations and REST API.</p>

                        <hr>
                        <h4 class="alert-heading">Project Stack</h4>
                        <strong>Back-end</strong>
                        <ul>
                            <li>Node.js Express</li>
                            <li>MongoDB Atlas / Mongoose</li>
                        </ul>
                        <strong>Front-end</strong>
                        <ul>
                            <li>Embedded Javascript (EJS)</li>
                            <li>jQuery</li>
                            <li>CSS</li>
                            <li>Bootstrap v5.0 framework</li>
                        </ul>
                        <strong>Others</strong>
                        <ul>
                            <li>Cloudinary as a third party media database</li>
                        </ul>
                        <strong>Deployed via Heroku</strong>
                        <hr>
                        <h4 class="alert-heading">GitHub Repository</h4>
                        <p>
                            Please visit my GitHub <a href="">here</a> for more insight into this application.
                        </p>
                        <hr>
                        <h4>Documentation, features, and technologies</h4>
                        <h5><strong>- Overview</strong></h5>
                        <ul>
                            <li>User must sign up for a new account and sign in to access certain features</li>
                            <li>Signed in users can create new data, seed sample data, and delete any and all
                                current
                                documents.</li>
                            <li>Signed in users can favorite profiles and access the favorites tab</li>
                            <li>Pop ups are displayed on the top left with a lifespan of 10 seconds when users
                                create a
                                new account, create, edit, or delete items</li>
                            <li>Responsive and scales to all window sizes</li>
                        </ul>
                        <h5>- Sign up page</h5>
                        <ul>
                            <li>Username validation: No symbols / capitalizations, 4-12 characters and at least 1
                                letter
                            </li>
                            <li>Password validation: At least 4 characters long</li>
                            <li>Confirm password validation</li>
                            <li>User password is hashed via Bcrypt</li>
                        </ul>
                        <h5>- Login page</h5>
                        <ul>
                            <li>Username and password validation: Data is pulled from the browser and compared to
                                username/password stored in database for match</li>
                        </ul>
                        <h5>- Index page</h5>
                        <ul>
                            <li>User Panel: Created using bootstrap accordion, allowing signed-in users to create,
                                seed,
                                and delete data</li>
                            <li>Profile cards: Created using bootstrap cards</li>
                            <li>Pagination: Created from scratch, allowing up to 8 profiles per page</li>
                        </ul>
                        <h5>- Favorites page</h5>
                        <ul>
                            <li>
                                Favorite button: Allows users to favorite/unfavorite profiles to add/remove them
                                from the user's favorites page
                            </li>
                        </ul>
                        <h5>- Third party apps</h5>
                        <ul>
                            <li>Cloudinary: Third party media databased for users to upload their own images</li>
                        </ul>
                        <h4 style="color: rgb(248, 120, 1);">CRUD</h4>
                        <h5>- Create page (Create)</h5>
                        <ul>
                            <li>Displays form for user input</li>
                            <li>Text validation to ensure one or more fields are filled</li>
                            <li>Allows user to upload image via Cloudinary</li>
                        </ul>
                        <h5>- Show page (Read)</h5>
                        <ul>
                            <li>Displays all schema data passed into each document (profile). </li>
                            <li>Allows signed-in users to edit / delete the displayed document</li>
                        </ul>
                        <h5>- Edit page (Update)</h5>
                        <ul>
                            <li>Displays form for user input- fields are filled with document's current information
                            </li>
                            <li>Image is kept the same if user fails to upload new image</li>
                        </ul>
                        <h5>- Delete button (Delete)</h5>
                        <ul>
                            <li>Allows signed-in user to delete current document</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

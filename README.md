http://pawsrus.herokuapp.com/main/about

My approach to this project was to focus on implementing features that varied in code design, from signup validation to pageination to commenting.

I decided on a minimalistic front-end design as I prefer working on code that handles server-side operations rather than making my site look nice, yet I found myself spending a lot of time on design as well to ensure consistency.

Creating the pagination definitely took the most amount of brain power to create from scratch. I realized after making the pagination that it came with a few unforeseen issues like having to keep track of the users current page to ensure the user is redirected back to the same page after completing an operation. A bulk of my time was dedicated to maintaining consistency of page redirections. For example, when deleting the last profile on a page, the code will redirect you to the previous page (unless you're already on the first page), taking the user back to their last visited page when they click the back button on a profile, creating a new document takes the user to the page where the document was made, etc. I could just as easily have let the operations always redirect the user to page 1, but I couldn't let that happen.

My hope is that this site can show off some back-end features as the front-end is quite uninteresting except for the sign-up reactive validation. When I made this project, I had not yet learned React JS so I hope to develop a new app in the future and integrate a more interactive front-end design.

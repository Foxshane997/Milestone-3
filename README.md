# Milestone Project 3  
## Music Queue Application  

**Name:** CliquePlay  

### Application Description  
A tool to help manage song requests.  
Users can register and log in to submit songs that are added to a queue & listen to the song.  

**Features include:**  
- Administrative tools to clear songs in the queue.  
- Song choices will be pulled from Spotify API.  
- Simple to use and view.  
- Previewing or listening to a queued song.  

### Tools  

#### Frontend  
- React.js  

#### Backend  
- Express.js  

#### Database  
- PGadmin - SQL (RDBMS)  

#### Languages  
- JavaScript  
- HTML5  
- CSS3  
- SQL  
- Node.js  
- Markdown  

#### Security  
- Password Hashing  
- JWT Authentication
- Local storage for persisting login
- Local storage user token  

#### Deployment  
- Railway  
  - Frontend  
  - Backend  
  - Database  

#### Misc  
- Axios  
- React-Toastify  

### Endpoints  

- `/`  
  Song Queue page  

- `/login`  
  Login page.  
  Must be a registered user.  

- `/register`  
  Register page  

- `/songrequests`  
  Song request page.  
  Must be signed in to use.  

- `/admin`  
  Admin page.  
  Must be an admin to access.  
  Admins can clear the song queue from this page.  

### API  
- Spotify API  

### Tutorial  
1. Register and sign in upon entering the application.  
2. Search for songs and add them to the queue.  
3. Admins can:  
   - Access the admin page.  
   - Clear the queue.  

### Tools for Organization  
- Trello  
- Google Docs  

### Notes  
 ### What we would have liked
 - User Profile

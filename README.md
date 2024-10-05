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

## Legal Information for Using Spotify API

This application, **CliquePlay**, uses the Spotify API to fetch song data, allowing users to preview or listen to queued songs. The following legal aspects apply when using the Spotify API:

1. **Spotify Developer Terms of Service**:
   This project complies with [Spotify's Developer Terms of Service](https://developer.spotify.com/terms/). By using this application, both developers and users agree to adhere to Spotify's terms.

2. **Usage Limitations**:
   - The Spotify API is used strictly to search for, display, and preview song data. Full track playback is not supported unless authorized through Spotify's premium services.
   - Users must have their own Spotify account to authenticate and interact with the API, including song previews.

3. **Attribution**:
   - This project uses content from Spotify, including song metadata (track names, album art, etc.). All music content is owned by Spotify and its respective rights holders.
   - Appropriate credit is given to Spotify, and no part of this project attempts to claim ownership over Spotify's intellectual property.

4. **Data Privacy**:
   - User data, including Spotify account information, is handled in accordance with Spotify's [Privacy Policy](https://www.spotify.com/legal/privacy-policy/) and is not stored or shared outside the app's intended use.

5. **Intended Use**:
   - This application is for personal and non-commercial use. The Spotify API is not used for direct commercial gain. Users interact with Spotify's services via the API within the limits set by Spotify.

Please ensure that any further use of Spotify’s API complies with Spotify’s terms and conditions.


### Notes  
 ### What we would have liked
 - User Profile
 - Volume Controller

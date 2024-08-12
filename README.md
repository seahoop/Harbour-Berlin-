# Project Choice 
Habo-Berlin(Guardian Regsitration System)

# Project Description

The Habo-Berlin Guardian Registration System provides secured CRUD operations for Habo-Berlin's cutting-edge data center. Habo-Berlin is a state-of-the-art facility strategically located in the heart of Berlin, hosting three lines of Guardians: Atlas, Norma, and Clasper. These advanced Guardians collaborate with police units to strictly enforce law and order, ensuring peace and security in the region. Habo-Berlin is meticulously designed to maintain 36 Guardians at all times, serving a population of 3.6 million in the city.

The Guardians are tasked with addressing only the most serious criminal activities, such as armed robbery, hostage rescues, and terrorism. Due to the high-risk nature of their operations, Guardians frequently sustain damage and are sometimes destroyed. Habo Industry, the manufacturer of the Guardians, continually innovates and integrates the latest technologies into their designs. Consequently, maintaining up-to-date records is of utmost importance for Habo-Berlin. The secure CRUD functionality in the data center is crucial for the seamless operation of Habo-Berlin, ensuring the Guardians are always equipped with the latest advancements to effectively perform their duties.




# File Structure Of the Proposed Project 
![some alt text](https://i.postimg.cc/kGJdjmGX/Screenshot-2024-08-12-at-10-23-36-AM.png)


# Visual of Guardians 

### Atlas
![some alt text](https://i.postimg.cc/gJnMzxYt/a90dc91f-5ba4-4b2d-91d9-2f357a3733e9.webp)
### Norma
![some alt text](https://i.postimg.cc/N00DDKrG/fc74f505-8849-4e6e-8bd8-f97485469d7a.webp)
### Clasper
![some alt text](https://i.postimg.cc/qqKjKW68/f5bcc9e4-e526-4e2e-a6da-3daa9936938b.webp)
# Visual of interface
![some alt text](https://i.postimg.cc/HWw1L8Z0/3761722613805-pic.jpg)
![some alt text](https://i.postimg.cc/4xFr06yG/3771722613809-pic.jpg)
![some alt text](https://i.postimg.cc/hj8ZKTDf/3781722613813-pic.jpg)
![some alt text](https://i.postimg.cc/yxpdxfsd/3791722614800-pic.jpg)
![some alt text](https://i.postimg.cc/Gpnp4Twk/3801722614804-pic.jpg)
![some alt text](https://i.postimg.cc/nc6FW9L6/3811722614808-pic.jpg)

# ERD
![some alt text](https://i.postimg.cc/4dkhT413/3831722628163-pic.jpg)

# Route 
![some alt text](https://i.postimg.cc/2yNdTFt2/Screenshot-2024-08-02-at-3-43-33-PM.png)
![some alt text](https://i.postimg.cc/q7gG77nX/Screenshot-2024-08-02-at-3-43-46-PM.png)





# User Stories
1. User will be able to Register new guardians into the system.
2. User will be able to edit and see the details of guardians, including weaponary, systme, version, anti-cybersecurity system, and defense information. 
3. User only able to acces editing and see guardian information after signing in. 
4. system is able to sign up new employees for credentials. 
5. In detail of the list of guardians I want to see pictures of what the guardians look like.
6. I want there to be buttons where I can go back to the last stage i was at/or home page. 
7. When username or password is incorrect i want to be informed, when correct I want to go to the control panel.  
8. when sigining up two password have to match otherwise let me know, it has to be in email format to sign up otherwise let me know. 
9. When registering new guardian when click save i want to be informed is saved correctly. 
10. The amount of robot will be caped at 36, when more then that let me know. 


## Stretch Goals
1. Integrate Chat GPT API into registration system. 
2. put voice over like when you sign into your account it say some cool stuff like "Welcome to Habo-Berlin central command". 
3. When adding an new robot and saved succesfully say "welcome to the family atlas #33" things like that. 
4. Password recovery through email 





# Pseudocode



### Landing page 
- Write welcoming words, with Habo-Berlin logo and name. 
- link for employee sign in, and an link for employee to sign up. 
- if there is an question, chat gpt is there to help with API integration. 
- Clickable and jumps to the directed page 
### Sign in page 
- when enter right username and password trasnfer to contorl panel. 
- if password or username wrong make it known. 

### Sign up page 
- email have to be an valid email otherwise make it known 
- password and confirm password must be the smae otherwise make it known. 
- when eveyrthing in place and correct press sign up, and new user registered in database. 


### After sign in new guardian and guardians list page 
- Show the name of each guardian registered. 
- on each line there will be an clickable details, and edit option. 
- when click details all detail will be shown without edit option. 
- when click on edit all detail will be shown in an format which is editable, and when clicked on update all information updates in database with new informaiton. 

### Register new Guardian page
- Enter everycolumn of infromation otherwise unable to register is shown. 
- when all information put in and press save, the new guardian is registered. 
- the guardians will be capped at 36, more then 36 wont be able to register. 


# Self Paced Schedule
### August 2nd
- Task: Set up project repository and initialize the project
- Create project structure
- Install necessary dependencies
- Set up version control
### August 3rd
- Task: Develop Landing Page
- Create welcoming words, Harbour-Berlin logo, and name
- Add links for employee sign-in and sign-up
### August 4th
- Task: Develop Sign-In Page
- Create form for username and password input
- Implement functionality to validate credentials and navigate to the control panel
- Display error messages for incorrect credentials
### August 5th
- Task: Develop Sign-Up Page
- Create form for email, password, and confirm password
- Validate email format and password matching
- Register new users in the database
- Display error messages for invalid input
### August 6th
- Task: Develop Control Panel
- Display list of all registered Guardians
- Implement navigation to details and edit pages for each Guardian
- Ensure only authenticated users can access the control panel
### August 7th
- Task: Develop Guardian Details Page
- Display all details of a selected Guardian
- Ensure details are read-only
### August 8th
- Task: Develop Edit Guardian Page
- Create a form pre-filled with the selected Guardian's details
- Implement functionality to update Guardian details in the database
### August 9th
- Task: Develop Register New Guardian Page
- Create a form to input new Guardian details
- Implement functionality to save new Guardian to the database
- Ensure a cap of 36 Guardians is enforced
- Display error messages for invalid input or exceeding the cap
### August 10th
- Task: Implement User Feedback
- Display confirmation messages for successful sign-in, sign-up, Guardian registration, and updates
- Ensure error messages are user-friendly and informative
### August 11th
- Task: Final Testing and Debugging
- Test all functionalities to ensure they work as expected
- Fix any bugs or issues found during testing
### Stretch Goals (August 8th to August 11th)
- Integrate Chat GPT API into registration system.
- Add voice-over functionality for sign-in and Guardian registration confirmations.

# technology used
javascript
css
mongodb
ejs
heroku hosting
html
markdown

# Screenshot of the Registration system
![some alt text](https://i.postimg.cc/wxZCGD3M/Screenshot-2024-08-11-at-11-19-23-PM.png)

# Link of the Registration system
https://habo-berlin-8a00ae3125ba.herokuapp.com/

## Cited Page 
- https://openai.com/index/chatgpt/
- https://developer.mozilla.org/en-US/
- https://github.com/
- https://fonts.google.com/
- https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- https://www.youtube.com/

















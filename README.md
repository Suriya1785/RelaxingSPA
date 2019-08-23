# Relaxing SPA (India)  
##### 2019 Hartcode program (JS Bootcamp project)
#### Author : Suriya N Rajamani

![WebsitePromo](public/images/relaxingSpaReadMe.PNG)

## Purpose:
Offers effective Massage treatments for back pain with supervision of highly qualified doctors and therapists and Helps customers to select, enjoy and be healthy.
Provides various Ayurveda panchakarma treatments with effective plans

# Audience:
- Primary: Patients with back pain, stress and muscle tension.
- Secondary: All humans older than 5 years can enjoy the massage and be healthy forever.

## Single Page App
### Home section
- Provides information about ayurvedic massage and logo of the site with picture.
- Provides details on ayurvedic treatments and its benefits.
- This can also be viewed upon clicking on navigation dropdown.

### Services Section
- Options to search courses by category from the dropdown list. Upon selection, it lists down the list of courses under the selected category from our learning center collections.
- Upon selection of courses, it provides brief note on them and link to detail courses page.

##Server setup and start
This assumes that the user has Node.js installed globally on their machine.

#####Installing the Express framework into the application and setting up the folders:
- First, clone or copy project from GitHub down to a folder on your machine
- Your folder setup should look like this (folder is an example):

######Main Folder:
C:>RelaxingSPA place the server.js under here

######subfolders under RelaxingSPA:
data (where the JSON data files would be placed) public (this is your "root" directory)

######subfolders under public: 
css(your styles.css) images (any images) scripts (your js scripts other than server.js)
- Go to your command prompt
- Under your folder for the application, install the Express framework using NPM by typing:
npm install express --save
- Then you'd install the body-parser package using NPM by next typing:
npm install body-parser --save
- once setup is complete, please execute below in cmd prompt under root directory
node server.js

## Reporting issues
Use [Github Issues section for this repository](https://github.com/Suriya1785/RelaxingSPA/Issues) to report any issues with the notes.

Examples of the kind of issues that may need reporting:
+ Typos
+ Code samples not working as described
+ Broken or moved links
+ Etc.

# Credits
- content provided by [ayurnava](https://www.ayurnava.com/ayurvedic-massage.html), [wiki](http://www.wiki.com), [keralaayurhealth](http://www.keralaayurhealth.com/).
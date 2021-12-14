# Employee-Tracker# Project Name :  Employee Tracker
  ![License: ISC](https://img.shields.io/badge/license-ISC-green)
  ## Description:
  The Application presents an **content management systems (CMS)** interface that manage a company's employee database using Node.js, Inquirer, and MySQL.
  ## Table of Contents 
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [ScreenShot](#screenShot)
  - [Links](#links)
  - [Questions](#questions)
  - [Copyright](#copyright)
  ## Installation
  to install dependencies , run this following command :
``` 
 npm i
 ```
  ## Usage
The User needs to clone first the repo then install dependencies by runing the following command :


1. Go to the database directory to connect :

 ``` 
cd .\db\
 ```

2. connect to the database :

 ``` 
mysql -uroot -p
 ```

3. Create database and tables :

  ``` 
source schema.sql
 ```
4. insert value into tables :
  ``` 
source seeds.sql
 ```

5. go back to the server file : 

  ``` 
cd .. 
 ```
6. run the server.js file
  ``` 
npm start
 ```

  ## License
  this Project is licensed under **ISC** license.
 ## ScreenShot 

Appliction 's interface:
  ![interface](./screenshots/interface.png) 

  ## Links

  * Watch [the walkthrough video](https://drive.google.com/file/d/1_Dq22MeUpVtxWCUbRXa9vS42SRadtMRP/view) that demonstrates the functionality of the application.

  * The URL of the GitHub repository : https://github.com/MERYEM-AD/Employee-Tracker 
  ## Questions
  iF you have any questions about the repo you can contact me by email : adiri.meryem.mw@gmail.com.

  Follow me on [my Github account](https://github.com/MERYEM-AD).
  ## Copyright
 
```
Copyright 2021 , Meryem Adiri.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

```
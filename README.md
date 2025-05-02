# Thingsboard-data-fetch-MESE-Bilisim
It is an HTML page where login, devices and data are taken with HTML and JAVASCRIPT using Thingsboard API.

# Table of Content

 - [Installation](#Installation)
 - [About Project](#Usage)
 - [Contributing](#Contributing)
 - [License](#License)


# Installation
  
1) First of all, create the add device temperature feature from ThingBoard website.
* [ThingsBoard dokümantasyon](https://thingsboard.io/docs/pe/user-guide/)

2) Clone the repo and create an .env File 
+ For instance :
```
MONGO_URI=mongodb://localhost:27017/kullanici
PORT=5000
JWT_SECRET=1234567890
JWT_REFRESH_SECRET=0987654321
```
```
- https://github.com/faikmermer/faikmermer-Thingsboard-data-fetch-MESE-Bilisim.git
```
3) Make sure you have Node.js and MongoDB installed. 
* (to download Nodejs: [Node.js Official Site](https://nodejs.org) and  [MongoDB](https://www.mongodb.com/try/download/community))
4) Install NPM packages
```
npm install
```
5) Run
```
 - nodemon .\src\index.js
 ```

# Usage

A login page was created using the ThingsBoard API. Then, on the homepage, a list of devices was displayed in a table format. A temperature variable was created for the devices, and values were sent to it beforehand using cURL (e.g., Postman). Later, using the device IDs obtained, a temperature table and graph were generated.

Below is the general workflow of the application:
* Device List:


![Device List](https://github.com/faikmermer/faikmermer-Thingsboard-data-fetch-MESE-Bilisim/blob/main/Project/assets/deviceList.gif)

* Data visualisation:


![data](https://github.com/faikmermer/faikmermer-Thingsboard-data-fetch-MESE-Bilisim/blob/main/Project/assets/verig%C3%B6rsel.gif)

#Contributing
To contribute to the project, follow these steps:

1. Fork the project
2. Creater your "feature brach" (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the brach (`git push origin feature-name`)
5. Open a pull request

# License
Distributed under The Unlicense License.

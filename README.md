# The Odin Project: Inventory Application

This is The Odin Project's Project: Inventory App (https://www.theodinproject.com/lessons/nodejs-inventory-application)
Made with Express and MongoDB. MongoDB Atlas is used with Mongoose ODM for database management.
Multer and Cloudinary is used for image management and storage.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
node 18.13.0 or higher
```

### Installing

- Clone the repository using ssh or https:

(If you have a ssh key for github) SSH:

```
git clone git@github.com:sum4n/TheOdinProject-InventoryApplication.git
```

or https:

```
git clone https://github.com/sum4n/TheOdinProject-InventoryApplication.git
```

- Go into project folder:

```
cd TheOdinProject-InvetoryApplication
```

- Install dependencies:

```
npm install
```

- Set up database (MongoDb with Mongoose):
  https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database

- Set up your Cloudinary account for the secret keys / image uploading to work.

- Add secret keys:
  Add you environment variables for MongoDB and Cloudinary:

```
process.env.MONGODB_URI_wow_store=<your MongoDB url>
process.env.CLOUDINARY_CLOUD_NAME=
process.env.CLOUDINARY_API_KEY=
process.env.CLOUDINARY_API_SECRET=
```

- Add dummy data

```
node populatedb <your MongoDB url>
```

- Run the application

```
npm run serverstart
```

- Open browser and go to:

```
localhost:3000
```

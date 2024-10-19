|## Fleet Management App
This application allows users to create, read, update, and delete (CRUD) vehicle records. It interacts with a local API to manage vehicles effectively.

## Features
Add Vehicle: Submit a new vehicle with details like make, model, and license plate.
View Vehicles: View a list of all vehicles fetched from the API.
Edit Vehicle: Update the details of an existing vehicle.
Delete Vehicle: Remove a vehicle from the list.

## set up instruction
Install JSON Server globally by running:
npm install -g json-server
## step  to run
clone the repository 
Start the JSON Server:http://localhost:3000
## Open the project:
 Open index.html in your browser to use the Product Management Application.
 ## API Endpoints
GET /products: Fetch all products.
POST /products: Add a new product.
DELETE /products/:id: Delete a product by ID.
PUT /products/:id: Update a product by ID.

## Live server
* You can view the web live on [Fleet Management App](https://cutie-sudo.github.io/Phase-1-Project/)

## Render
You can view on (https://phase-1-project-2-tjsf.onrender.com)

## Presentation Slides
You can view on ([text](<../../Downloads/FLEET MANAGEMENT APP.pptx>))


## How the Fleet Management App Works
Fetching Vehicles: Upon loading the page, the application fetches the list of vehicles from the server and displays them dynamically.

Adding Vehicles: Users can fill in the vehicle form with details such as make, model, and license plate. Upon submission, the vehicle is added to the server and displayed on the page.

Editing Vehicles: Clicking the "Edit" button for a vehicle will populate the form with the current details, allowing users to modify and save changes.

## Problems Faced
During the development of this application, several challenges were encountered, including:

API Integration: Ensuring the application communicates effectively with the local JSON server and handles errors gracefully.

Form Handling: Managing form states during the creation and editing of vehicles required careful event handling and state management.

UI Updates: Dynamically updating the vehicle list in the UI after performing CRUD operations was essential for a seamless user experience.

License
This project is licensed under the MIT License (https://github.com/cutie-sudo/Phase-1-Project/blob/main/license.md*)







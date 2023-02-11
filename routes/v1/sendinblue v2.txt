// I made some research and the most simpliest way of implementing what you wanted was as follows
//Install any Javascript library used to make HTTP requests from node.js
// personally i prefer axios; npm i axios --save
//import the its module.
const axios = require("axios");

//In your project route that handles the user sign-up add the code snippet below
router.post((req, res) => {
	axios
		.request({
			//make a post request to the sendinblue API
			method: "POST",
			url: "https://api.sendinblue.com/v3/contacts",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				//assign the "api-key" property the value of the generated key from SMTP & API option
				"api-key": "add the apiKey that you generate here",
			},
			data: {
				updateEnabled: false, // to update the existing contact/email in the same request
				email: "NewUserEmail", // the user email from the OAUTH
				listIds: ["list ids"], // the list ids to which the contact/email is to be saved.
				//Addition of the contact/email to the list will trigger the automation if the workflow was setup correctly
			},
		})
		.then(response => res.send(response)) // send a response to back to the user
		.catch(error => res.send(error.response.text)); // handle errors in the catch block.
	//the only error that i encountered was if the contact/email already exists. but other errors can also come up
});

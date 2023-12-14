/*A user enters the website and finds a list of the names, dates, times, locations,
 and descriptions of all the parties that are happening.
Next to each party in the list is a delete button. 
The user clicks the delete button for one of the parties. 
That party is then removed from the list.
There is also a form that allows the user to enter information about a new party that they want to schedule. 
After filling out the form and submitting it, the user observes their party added to the list of parties. */

//step 1: create a variable for the api url
const API_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FTB-MT-WEB-PT/events";

//step 2: create a state
const state = {
  // add the parties here
  parties: [],
};
//step 3: create a render function
async function render() {
  await getParties();
  document.querySelector("#outputs").innerHTML = state.parties.join("");
}

//create a fetch method
async function getParties() {
  try {
    //fetch the initial data
    const response = await fetch(API_URL);
    console.log("response =>", response);
    const json = await response.json();
    console.log("scriptData =>", json.data);
    state.parties = json.data;
    return json.data;
  } catch (error) {
    console.error("there was an issue getting your data");
  }
}

getParties();

async function createParties(name, date, time, location, description) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, time, location, description }),
    });
    const json = response.json();
    if (json.error) {
      throw new Error(json.message);
    }
  } catch (error) {
    console.error(error, "there was an issue posting your data");
  }

  async function updateParties() {}
  // // define the dom elements
  // const generalInput = document.querySelector("input");
  // const nameInput = document.querySelector('input[name="name"]');
  // const dateInput = document.querySelector('input[name="date"]');
  // const timeInput = document.querySelector('input[name="time"]');
  // const locationInput = document.querySelector('input[name="location"]');
  // const descriptionInput = document.querySelector('input[name="description"]');
  // //obtain the user input values
  // generalInput.forEach (inputs => {
  //     return inputs.value;
  // })
}

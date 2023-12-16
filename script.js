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
//get DOM queries
const button = document.querySelector("#submit");
//the outputs
const outputs = document.querySelector("#outputs");
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", inputValues);
const update = document.querySelector("#update");

//step 2: create a state
const state = {
  // add the parties here
  parties: [],
};
//step 3: create a render function
async function render() {
  await getParties();
  renderParties();
}
render();

//create a fetch method
async function getParties() {
  try {
    //fetch the initial data
    const response = await fetch(API_URL);
    console.log("response =>", response);
    const json = await response.json();
    console.log("scriptData =>", json.data);
    state.parties = json.data;
    renderParties();
  } catch (error) {
    console.error("there was an issue getting your data");
  }
}

getParties();

async function createParties(name, date, time, location, description) {
  try {
    const dateFormatted = new Date(date);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        date: dateFormatted.toISOString(),
        location,
      }),
    });
    const json = response.json();
    render();
    if (json.error) {
      throw new Error(json.message);
    }
  } catch (error) {
    console.error(error, "there was an issue posting your data");
  }
}

//create a function that deletes the parties.  REMEMBER NOT TO DELETE PRE-EXISTING PARTIES FROM THE API!!!
async function deleteParty(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new error("there was an error deleting the party");
    }
    //update the UI
    render();
  } catch (error) {
    console.error("There was an error /DELETE parties");
  }
}

//render the parties
function renderParties() {
  // if they don't exist, display not found
  if (state.parties.length === 0) {
    update.innerHTML = `<li> No parties were found </li>`;
    return;
  }
  const partiesScheduled = state.parties.map((party) => {
    // create an li
    const scheduledParty = document.createElement("li");
    //add a class to that
    scheduledParty.classList.add("party");
    scheduledParty.innerHTML = `
    <h2>${party.name}</h2>
    <div>${party.date}</div>
    <div>${party.time}</div>
    <div>${party.location}</div>
    <div>${party.description}</div>
    `;
    //make a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    //append it
    scheduledParty.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => deleteParty(party.id));
    return scheduledParty;
  });
  outputs.replaceChildren(...partiesScheduled);
}

// organize the input values into a function
//name, date, time, location, description
async function inputValues(event) {
  event.preventDefault();
  addInput = document.querySelectorAll("input");
  console.log(addInput);
  console.log(addInput[1].value);
  await createParties(
    addInput[0].value,
    addInput[1].value,
    addInput[2].value,
    addInput[3].value,
    addInput[4].value
  );
}
console.log(state.parties);

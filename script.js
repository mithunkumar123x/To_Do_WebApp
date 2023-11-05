// Define the base URL for the CRUD API
const baseURL = "https://crudcrud.com/api/e3b179821c2e4e4dad2a3199c7c242d2";

// Function to fetch the item list from the API
function fetchItemList() {
  axios.get(`${baseURL}/items`)
    .then(function (response) {
      // Clear the existing item list
      document.getElementById("itemList").innerHTML = "";

      // Iterate over the fetched items and add them to the list
      response.data.forEach(function (item) {
        addItem(item); // Pass the item to the addItem function
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Function to add an item to the list
function addItem(item) {
    if (item && item.name && item.description) {
      // Create a new list item
      const li = document.createElement("li");
  
      // Create a span element for the item name
      const spanItemName = document.createElement("span");
      spanItemName.innerHTML = item.name;
      li.appendChild(spanItemName);
  
      // Create a span element for the item description
      const spanItemDesc = document.createElement("span");
      spanItemDesc.innerHTML = item.description;
      li.appendChild(spanItemDesc);
  
      // Create save button
      const saveButton = document.createElement("button");
      saveButton.innerHTML = "Save";
      saveButton.classList.add("save-button");
      li.appendChild(saveButton);
  
      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.classList.add("delete-button");
      li.appendChild(deleteButton);
  
      // Append the list item to the item list
      document.getElementById("itemList").appendChild(li);
  
      // Add event listeners to the save and delete buttons
      saveButton.addEventListener("click", function () {
        saveItem(item._id, li);
      });
      deleteButton.addEventListener("click", function () {
        deleteItem(item._id, li);
      });
    } else {
      console.log("Invalid item data:", item);
    }
  }
  
  // Update the item using the CRUD API
  axios.put(`${baseURL}/items/${itemId}`, updatedItem)
    .then(function (response) {
      console.log("Item updated:", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    

// Function to save an item
function saveItem(itemId, itemElement) {
    // Get the updated item name and description
    const updatedItemName = itemElement.querySelector("span:first-child").innerHTML;
    const updatedItemDesc = itemElement.querySelector("span:nth-child(2)").innerHTML;
  
    // Create the updated item object
    const updatedItem = {
      name: updatedItemName,
      description: updatedItemDesc
    };
  
    // Update the item using the CRUD API
    axios.put(`${baseURL}/items/${itemId}`, updatedItem)
      .then(function (response) {
        console.log("Item updated:", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  // Function to delete an item
  function deleteItem(itemId, itemElement) {
    // Delete the item using the CRUD API
    axios.delete(`${baseURL}/items/${itemId}`)
      .then(function () {
        console.log("Item deleted:", itemId);
        itemElement.remove();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

// Fetch the item list when the page loads
fetchItemList();

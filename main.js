import { Users } from "./classes/Users.js"

const myUsers = new Users()

const selectUser = document.querySelector('#selectUser')


var map = L.map('map').setView([48.210033, 16.363449], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

myUsers.getAllUsers()


// Add EventListener for changes in the select element and update the map when a new user is selected
selectUser.addEventListener('change', () => {

    const selectedUserId = selectUser.selectedOptions[0].id

    // Get the location of the selected user and update the map
    myUsers.getUserLocation(selectedUserId, map)

})

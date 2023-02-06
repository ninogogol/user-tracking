export class Users {

    marker = null

    // Method to fetch all the users from a remote API and populate the dropdown
    async getAllUsers() {

        const selectUser = document.querySelector('#selectUser')

        // Initialize the dropdown with a default option
        selectUser.innerHTML = '<option>Choose a user...</option>'

        try {
            
            const res = await fetch('https://jsonplaceholder.typicode.com/users')

            const users = await res.json()

            let data = ''

            // Loop through each user and create an option element with their name and id
            users.forEach(user => {
                data += `<option id="${user.id}">${user.name}</option>`
            })

            // Append the options to the dropdown
            selectUser.innerHTML += data

        } catch (error) {

            throw new Error(error)

        }

    }


    // Method to fetch the location of a user and display it on the map
    async getUserLocation(id, map) {


        try {
    
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
    
            const users = await res.json()

            // Find the selected user based on their id
            const selectedUser = users.find(user => user.id == id)

            // If a marker instance exists, remove it from the map
            if (this.marker) {
                map.removeLayer(this.marker)
            }

            // Create a new marker for the selected user
            this.marker = L.marker([selectedUser.address.geo.lat, selectedUser.address.geo.lng]).addTo(map)

            this.marker.bindPopup(`Name: ${selectedUser.name}<br>
                                    Username: ${selectedUser.username}<br>
                                    City: ${selectedUser.address.city}<br>
                                    Zipcode: ${selectedUser.address.zipcode}<br>
                                    lat: ${selectedUser.address.geo.lat}, lng: ${selectedUser.address.geo.lng}`).openPopup()
            map.setView([selectedUser.address.geo.lat, selectedUser.address.geo.lng], 2)

    
        } catch (error) {
            
            throw new Error(error)
        }
    }


}


let amount = 0;
let count = 0;

// Parking slots for each location in every city
const slots = {
    Mumbai: {
        "Mall Parking": { Bike: 3, Car: 5, Bus: 3 },
        "Railway Station Parking": { Bike: 15, Car: 7, Bus: 4 },
        "Beach Side Parking": { Bike: 12, Car: 6, Bus: 2 }
    },
    Delhi: {
        "Connaught Place Parking": { Bike: 8, Car: 4, Bus: 2 },
        "Metro Station Parking": { Bike: 14, Car: 6, Bus: 3 },
        "Shopping Complex Parking": { Bike: 10, Car: 5, Bus: 2 }
    },
    Hyderabad: {
        "Cineplanet,Kompallay": { Bike: 8, Car: 4, Bus: 2 },
        "Metro Station Parking,Kukatpally": { Bike: 14, Car: 6, Bus: 3 },
        "D-Mart ,kompally": { Bike: 3, Car: 3, Bus: 2 }
    },

    Bangalore: {
        "IT Park Parking": { Bike: 12, Car: 6, Bus: 3 },
        "Market Area Parking": { Bike: 9, Car: 5, Bus: 3 },
        "Apartment Parking": { Bike: 11, Car: 6, Bus: 2 }
    }
};

// Update locations based on selected city
function updateLocations() {
    let city = document.getElementById("city").value;
    let locationDropdown = document.getElementById("location");
    locationDropdown.innerHTML = "";

    Object.keys(slots[city]).forEach(location => {
        let option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        locationDropdown.appendChild(option);
    });

    updateSlotDisplay();
}

// Update slot availability in UI based on city and location
function updateSlotDisplay() {
    let city = document.getElementById("city").value;
    let location = document.getElementById("location").value;
    document.getElementById("bike-slots").innerText = slots[city][location].Bike;
    document.getElementById("car-slots").innerText = slots[city][location].Car;
    document.getElementById("bus-slots").innerText = slots[city][location].Bus;
}

// Initialize locations for the default city
window.onload = updateLocations;

function parkVehicle(vehicleType, price) {
    let city = document.getElementById("city").value;
    let location = document.getElementById("location").value;

    if (slots[city][location][vehicleType] > 0) {
        amount += price;
        count += 1;
        slots[city][location][vehicleType] -= 1;

        document.getElementById("output").innerHTML = `🚗Slot for  ${vehicleType} Has Been Booked at ${location}, ${city}!`;
        updateSlotDisplay();
        checkFullStatus();
    } else {
        document.getElementById("output").innerHTML = `⚠️ No slots available for ${vehicleType} at ${location}!`;
    }
}

function showRecord() {
    document.getElementById("output").innerHTML = `
        <p>Total Amount: ₹${amount}</p>
        <p>Total Vehicles Parked: ${count}</p>
    `;
}

function deleteRecord() {
    let city = document.getElementById("city").value;
    Object.keys(slots[city]).forEach(location => {
        slots[city][location] = { Bike: 10, Car: 5, Bus: 3 };
    });

    amount = 0;
    count = 0;
    document.getElementById("output").innerHTML = "Records Deleted!";
    updateSlotDisplay();
    updateParkingStatus("Available", "green");
}

function checkFullStatus() {
    let city = document.getElementById("city").value;
    let location = document.getElementById("location").value;
    if (slots[city][location].Bike === 0 && slots[city][location].Car === 0 && slots[city][location].Bus === 0) {
        updateParkingStatus("FULL", "red");
    }
}

function updateParkingStatus(text, color) {
    document.getElementById("status").innerText = text;
    document.getElementById("status").style.color = color;
}

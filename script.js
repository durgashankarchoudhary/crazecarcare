// Function to call when the Call option is clicked
function onCallOptionClick() {
    // Replace this with your desired call functionality
    alert("Calling now...");
}

// Function to call when the WhatsApp option is clicked
function onWhatsAppOptionClick() {
    // Replace this with your desired WhatsApp functionality
    alert("Opening WhatsApp...");
}

// Attach click event listeners to the elements
const callOption = document.querySelector(".call-option");
const whatsappOption = document.querySelector(".whatsapp-option");

callOption.addEventListener("click", onCallOptionClick);
whatsappOption.addEventListener("click", onWhatsAppOptionClick);

//Booking Pop up functions

// Get references to elements
const bookpopupContainer = document.getElementById('bookpopup-container');
const bookpopupForm = document.getElementById('bookpopup-form');
const closebookPopupButton = document.getElementById('close-bookpopup');

// Function to open the popup
function openbookPopup() {
  bookpopupContainer.style.display = 'flex';
}

// Function to close the popup
function closebookPopup() {
  document.getElementById('afterquote').style.display = 'none';
  bookpopupContainer.style.display = 'none';

  bookheading.style.display = "none";
  quoteheading.style.display = "flex";

  bookservice.style.display = "none";

  document.getElementById('bookForm').reset();
}


// Event listener to open the popup
document.getElementById('quotebutton').addEventListener('click', openbookPopup);

//funtion to execute on click of get quote
function bookbuttonclick(){
  openbookPopup();

  bookheading.style.display = "flex";
  quoteheading.style.display = "none";

  document.getElementById('afterquote').style.display = 'block';
}

// For example, on a button click
document.getElementById('bookbutton').addEventListener('click', bookbuttonclick);

// Event listener to close the popup
closebookPopupButton.addEventListener('click', closebookPopup);

// function to validate 10 digit mobile number
function validateMobileNumber() {
  var mobileInput = document.getElementById("mobile");
  var mobile = mobileInput.value.trim();

  if (mobile.length !== 10 || isNaN(mobile)) {
      if (!mobileInput.hasAttribute("data-error-shown")) {
          alert("Please enter a valid 10-digit mobile number.");
          mobileInput.setAttribute("data-error-shown", "true");
          mobileInput.focus();
      }
  } else {
      mobileInput.removeAttribute("data-error-shown");
  }
}

// function to stop continuously showing mobile number error
function resetErrorShownAttribute() {
  var mobileInput = document.getElementById("mobile");
  mobileInput.removeAttribute("data-error-shown");
 }

 // Function to calculate the quote and display the result
function calculateQuote() {
  const carServicePrices = {
    "Interior Cleaning": {
      "Hatchback": 1650,
      "Sedan": 2200,
      "SUV/Luxury": 2700,
    },
    "Paint Restoration": {
      "Hatchback": 2500,
      "Sedan": 3000,
      "SUV/Luxury": 4000,
    },
    "Interior Cleaning + Paint Restoration": {
      "Hatchback": 4000,
      "Sedan": 5000,
      "SUV/Luxury": 6500,
    },
  };

  const carType = document.getElementById("carType").value;
  const carService = document.getElementById("carService").value;
  const name = document.getElementById("name").value
  const mobile = document.getElementById("mobile").value

  if (name && mobile && carType && carService) {
    const quoteResult = document.getElementById("quoteResult");
    const quotePrice = carServicePrices[carService][carType];
    quoteResult.value = quotePrice;

    document.getElementById('bookservice').style.display = 'block';
  } else {
    // If either name or mobile or carType or carService is not selected, reset the quoteResult1 value
    document.getElementById("quoteResult").value = "";
  }
}

function bookserviceclick () {
  afterquote.style.display = 'block';

  bookheading.style.display = "flex";
  quoteheading.style.display = "none";
  
  bookservice.style.display = "none";
}

// Event Listener to book your service
document.getElementById('bookservice').addEventListener('click', bookserviceclick);

// Add an event listener to execute calculateQuote() if any of carType or carService is changed
carType.addEventListener('change',calculateQuote)
carService.addEventListener('change',calculateQuote)
document.getElementById("name").addEventListener("input", calculateQuote);
document.getElementById("mobile").addEventListener("input", calculateQuote);

// Function to set the minimum date for bookingDate input to today's date
function setMinimumBookingDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const minDate = `${yyyy}-${mm}-${dd}`;
  document.getElementById("bookingDate").setAttribute("min", minDate);
}

// Add an event listener to execute setMinimumBookingDate() once the document's content is loaded
document.addEventListener("DOMContentLoaded", function() {
  setMinimumBookingDate();
});

// Function to generate time slots for booking
function generateTimeSlots() {
  // Get the references to the date and time elements
  const bookingDate = document.getElementById('bookingDate');
  const bookingTime = document.getElementById('bookingTime');
  const startTime = 9; // 9 AM
  const endTime = 19; // 7 PM

  bookingTime.innerHTML = ''; // Clear any existing options

  const today = new Date();

  if (today < bookingDate.valueAsDate) {

    for (let hour = startTime; hour <= endTime; hour++) {
      const option = document.createElement('option');
      option.value = `${hour}:00`;
      option.textContent = `${hour}:00`;
      bookingTime.appendChild(option);
    }
  } else {
    const hournow = new Date().getHours();
    let newstartTime = Math.max(hournow + 2,9)

    for (let hour = newstartTime; hour <= endTime; hour++) {
      const option = document.createElement('option');
      option.value = `${hour}:00`;
      option.textContent = `${hour}:00`;
      bookingTime.appendChild(option);
    }
    } 
}

// Add an event listener to the date input to regenerate time slots if the date changes
bookingDate.addEventListener('change', generateTimeSlots);

// Function to execute on reset button
function resetpopupform() {
  document.getElementById('bookForm').reset(); // Reset the form
  document.getElementById('bookservice').style.display = 'none'; // Hide the "Book Your Service" button
}

// Event listener to reset
document.getElementById('resetform').addEventListener('click', resetpopupform);


// Handle form submission for booking
document.getElementById("bookForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const selectedCarType = document.getElementById("carType").value;
  const selectedCarService = document.getElementById("carService").value;
  const bookingDate = document.getElementById("bookingDate").value;
  const bookingTime = document.getElementById("bookingTime").value;
  // Here you can handle the booking submission and further processing if needed
  alert(`The booking for your ${selectedCarType} ${selectedCarService} is confirmed for ${bookingDate} at ${bookingTime}.`);
  });

// Get the current page's filename (e.g., "page1.html")
var currentPage = window.location.pathname.split('/').pop();

// Loop through the menu options and add the "active" class to the corresponding option
var menuOptions = document.querySelectorAll('.pages-list li a');
menuOptions.forEach(function(option) {
  if (option.getAttribute('href') === currentPage) {
    option.classList.add('active');
  }
});
function startApp() {
  const user_input = document.getElementById("telephone_number");

  const MTN = [
    "0703",
    "0706",
    "0803",
    "0806",
    "0810",
    "0813",
    "0814",
    "0816",
    "0903",
    "0906",
    "0913",
  ];
  const GLO = ["0805", "0807", "0811", "0815", "0705", "0905"];
  const NINE_MOBILE = ["0809", "0817", "0818", "0908", "0909"];
  const AIRTEL = [
    "0802",
    "0808",
    "0812",
    "0708",
    "0701",
    "0902",
    "0901",
    "0907",
  ];

  // Array to store all Nigerian number prefixes
  let num_prefix_store = MTN.concat(GLO, NINE_MOBILE, AIRTEL);

  user_input.addEventListener("input", (e) => {
    let phone_number = e.target.value;

    autoComplete(phone_number, num_prefix_store);

    verifyNumber(phone_number, MTN, GLO, NINE_MOBILE, AIRTEL);
  });
}

/* =========== BEGINNING OF ABSTRACTION ============ */

/* === Verify phone number function === */

function verifyNumber(phone_number, MTN, GLO, NINE_MOBILE, AIRTEL) {
  // Removing all white spaces
  phone_number = phone_number.replace(/\s/g, "");

  let network_prefix;
  let numberLength;
  let countryCode;

  const message_container = document.getElementById("message");
  const message_image = document.getElementById("network-logo");
  const message_display = document.getElementById("message-display");

  // Extracting prefix and verifying length
  if (phone_number[0] === "0") {
    network_prefix = phone_number.slice(0, 4);
    numberLength = 11;
  } else if (phone_number[0] === "+") {
    numberLength = 14;
    countryCode = phone_number.slice(0, 4);
    if (phone_number[4] === "0") {
      network_prefix = phone_number.slice(4, 8);
      numberLength = 15;
    } else {
      network_prefix = "0" + phone_number.slice(4, 7);
    }
  }

  const number_is_not_valid =
    phone_number.length > numberLength ||
    (phone_number.length >= 4 &&
      countryCode !== "+234" &&
      phone_number[0] === "+");

  // Message display
  if (number_is_not_valid) {
    message_image.src = "icon-warning.svg";
    message_display.innerText = "Invalid number format.";
    message_container.classList.add("red-border");
    message_container.classList.remove("hide");
  } else if (MTN.includes(network_prefix)) {
    message_container.classList.remove(
      "green-border",
      "yellow-border",
      "red-border"
    );
    message_image.src = "logo-mtn.svg";
    message_display.innerText = "This is an MTN number";
    message_container.classList.add("yellow-border");
    message_container.classList.remove("hide");
  } else if (GLO.includes(network_prefix)) {
    message_container.classList.remove(
      "green-border",
      "yellow-border",
      "red-border"
    );
    message_image.src = "logo-glo.svg";
    message_display.innerText = "This is a GLO number";
    message_container.classList.add("green-border");
    message_container.classList.remove("hide");
  } else if (NINE_MOBILE.includes(network_prefix)) {
    message_container.classList.remove(
      "green-border",
      "yellow-border",
      "red-border"
    );
    message_image.src = "logo-9mobile.svg";
    message_display.innerText = "This is a 9mobile number";
    message_container.classList.add("green-border");
    message_container.classList.remove("hide");
  } else if (AIRTEL.includes(network_prefix)) {
    message_container.classList.remove(
      "green-border",
      "yellow-border",
      "red-border"
    );
    message_image.src = "logo-airtel.svg";
    message_display.innerText = "This is an Airtel number";
    message_container.classList.add("red-border");
    message_container.classList.remove("hide");
  } else {
    message_container.classList.add("hide");
    message_container.classList.remove(
      "green-border",
      "yellow-border",
      "red-border"
    );
  }
}

/* === Autocomplete Function === */

function autoComplete(phone_number, num_prefix_store) {
  let ul = document.getElementById("suggestions");
  ul.classList.remove("hide");
  ul.addEventListener("click", (e) => {
    selectSuggestion(e, phone_number);
  });

  if (phone_number == "" || phone_number.length > 4) {
    ul.classList.add("hide");
  }

  function changeAutoComplete(phone_number, num_prefix_store) {
    ul.innerHTML = ``;
    if (phone_number.length) {
      let autoCompleteValues = autoComplete(phone_number, num_prefix_store);
      autoCompleteValues.forEach((value) => {
        addItem(value);
      });
    }
  }

  function autoComplete(phone_number, num_prefix_store) {
    return num_prefix_store.filter((value) =>
      value.toLowerCase().includes(phone_number.toLowerCase())
    );
  }

  function addItem(value) {
    ul.innerHTML = ul.innerHTML + `<li>${value}</li>`;
  }

  function selectSuggestion(e, phone_number) {
    let user_input = document.getElementById("telephone_number");
    if (e.target.tagName === "LI") {
      user_input.value = e.target.textContent;
      ul.innerHTML = ``;
      ul.classList.add("hide");
    }
  }

  changeAutoComplete(phone_number, num_prefix_store);
}

/* ============ END OF ABSTRACTION ============== */

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //

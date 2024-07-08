const sdk = new AppExtensionsSDK();
const { Command, View } = AppExtensionsSDK;

const form = document.querySelector(".form");
const close = document.querySelector(".close");
const link = document.querySelector(".link");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const createButton = document.querySelector(".create");

  createButton.style.backgroundColor = "indianred";
  createButton.value = "Request is sent";

  const { token } = await sdk.execute(Command.GET_SIGNED_TOKEN);
  const res = await fetch("https://grand-bear-handy.ngrok-free.app/deals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const dealId = await res.text();

  document.querySelector(".final").style.display = "block";

  link.addEventListener("click", async (e) => {
    await sdk.execute(Command.REDIRECT_TO, { view: View.DEALS, id: dealId });
    await sdk.execute(Command.CLOSE_MODAL);
  });

  removeEventListener("click", event.target);
  event.target.remove();
});

close.addEventListener("click", async (event) => {
  await sdk.execute(Command.CLOSE_MODAL);
});

(async function () {
  await sdk.initialize({
    size: { width: 1200, height: 700 },
  });
})();

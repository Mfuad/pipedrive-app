const test = document.getElementById("test");
const sdk = new AppExtensionsSDK();
console.log(sdk);

test.addEventListener("click", async () => {
  const { token } = await sdk.execute(Command.GET_SIGNED_TOKEN);
  await fetch("https://grand-bear-handy.ngrok-free.app/deals", {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
});

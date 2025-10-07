self.addEventListener("push", async (event) => {
  console.log({ data: event.data });
  const { title, body } = event.data.json();

  if (!title && !body) return "falhou";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
    }),
  );
});

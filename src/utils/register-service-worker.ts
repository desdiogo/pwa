export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js", {
        scope: "/notification",
      })
      .then(async (serviceWorker) => {
        let subscription = await serviceWorker.pushManager.getSubscription();

        if (!subscription) {
          subscription = await serviceWorker.pushManager.subscribe({
            applicationServerKey:
              "BA30pjoKq1Zymcw6V-wr7h0_NF8utGrmFLOvENyNR3U6IGXNw0SD8J-nXCWYwWnId7GVx13fbgUC-kfR0oTY-K8",
            userVisibleOnly: true,
          });
        }

        console.log({ subscription });
      });
  }
}

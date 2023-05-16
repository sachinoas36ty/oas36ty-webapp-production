import { Workbox } from "workbox-window";

let wb;

if ("serviceWorker" in navigator) {
  wb = new Workbox(`https://app-office36ty.protracked.in/service-worker.js`);
  // wb = new Workbox(`http://localhost:8080/service-worker.js`);


  wb.addEventListener("controlling", () => {
    window.location.reload();
  });

  wb.register();
} else {
  wb = null;
}

export default wb;

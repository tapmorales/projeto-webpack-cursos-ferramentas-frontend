// import { initPage } from "./app";
import "./sass/style.scss";

document.querySelector("#btn-init").addEventListener("click", () => {
  //   initPage();
  import("./app").then(module => {
    module.initPage();
  });
});

import { getCurrentWeather } from "./api";
import { loadDetailView } from "./detailView";
import { loadMainMenu, renderMainMenu } from "./mainMenu";
import "./styles/styles.scss";

export const rootElement = document.getElementById("app");

// loadDetailView("new york");
loadMainMenu();

import { getCurrentWeather } from "./api";
import { loadDetailView } from "./detailView";
import "./styles/styles.scss";

export const rootElement = document.getElementById("app");

loadDetailView("Zürich");

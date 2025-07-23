import { createBanner } from "../components/banner";

var bannerDiv = document.querySelector<HTMLDivElement>("#bannerDiv")!;

bannerDiv.appendChild(createBanner());

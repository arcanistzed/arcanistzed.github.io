globalThis.root = document.documentElement;

import("./color.js");
import("./list.js");

//#region Go To Top button
const gotoTop = document.getElementById("gotoTop");

// Handle showing goto top button during scrolling
document.addEventListener("scroll", () => {
	if (root.scrollTop > 20) {
		gotoTop.style.display = "block";
	} else {
		gotoTop.style.display = "none";
	}
});

// Handle goto top button
gotoTop.addEventListener("click", () => {
	root.scrollTop = 0;
});
//#endregion

//#region Google Analytics
globalThis.dataLayer = globalThis.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-PL71KBEP9H");
//#endregion

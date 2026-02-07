const root = document.documentElement;

import("./color.js");
import("./list.js");

//#region go to top button
const goToTop = document.getElementById("go-to-top");

// Debounce function to limit the rate of function execution
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Handle showing the go to top button when scrolling
document.addEventListener("scroll", debounce(() => {
	if (root.scrollTop > 20) {
		goToTop.classList.add("visible");
	} else {
		goToTop.classList.remove("visible");
	}
}, 100));

// Handle go to top button
goToTop.addEventListener("click", () => {
	root.scrollTop = 0;
});
//#endregion

//#region Google Analytics
const dataLayer = globalThis.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-PL71KBEP9H");
//#endregion

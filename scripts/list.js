//#region Random placeholder text in search box
const placeholders = [
	"What are you looking for?",
	"How can I help?",
	"What interests you?",
	"What are you trying to find?",
	"What's your query?",
	"What do you want to search for?",
	"Search for one of my projects",
	"This is a fuzzy search box",
	"Try searching here",
	"This placeholder changes when you reload!",
	"I hope you are having a good day!",
];
document.querySelector("#search-box").placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];
//#endregion

//#region List creation
const searchBox = document.getElementById("search-box");
const projects = await fetch("scripts/projects.json").then(res => res.json());

// If ListJS is available
if (globalThis?.List) {
	const options = {
		valueNames: ["name", { attr: "href", name: "link" }, "description", "tags"],
		item: `<li><a class="link"><h3 class="name"></h3><p class="description"></p><p class="tags"></p></a></li>`,
	};
	const projectList = new List("project-list", options);
	projects.forEach(project => {
		// Add to list
		projectList.add({
			name: project.name,
			link: project.link,
			description: project.description,
			tags: project.tags?.map(t => `#${t}`)?.join(", "),
		});
	});
}
//#endregion

//#region Slide the list elements in as they come into view
(function slideIn() {
	let previousY = window.scrollY;

	const callback = entries => {
		entries.forEach(entry => {
			const { isIntersecting, target: el } = entry;

			// Animate intersecting elements when scrolling down
			if (isIntersecting && window.scrollY >= previousY) {
				el.style.transition = "1s";
				el.style.transform = "none";
				el.style.opacity = 1;
			} else if (isIntersecting) {
				// Don't show any animation for elements already scrolled past
				el.style.transition = "none";
				el.style.transform = "none";
				el.style.opacity = 1;
			}

			// Store the current scroll position
			previousY = window.scrollY;
		});
	};

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	};

	const observer = new IntersectionObserver(callback, options);

	document.querySelectorAll(".list li").forEach(el => observer.observe(el));
})();
//#endregion

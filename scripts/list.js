//#region List creation
let projects = [];

try {
	const response = await fetch("projects.json", { cache: "no-store" });
	if (!response.ok) {
		throw new Error(`Failed to load projects.json: ${response.status}`);
	}
	projects = (await response.json()).reverse();
} catch (error) {
	console.warn("Unable to load projects.json. Rendering empty list.", error);
}

// If ListJS is available
if (globalThis?.List) {
	const options = {
		valueNames: ["name", { attr: "href", name: "link" }, "description", "tags"],
		item: `<li><a class="link" rel="noreferrer"><h3 class="name"></h3><p class="description"></p><p class="tags"></p></a></li>`,
	};
	const listRoot = document.getElementById("project-list");
	if (listRoot) {
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
	} else {
		console.warn("Project list root not found.");
	}
} else {
	console.warn("ListJS not available. Skipping list initialization.");
}
//#endregion

//#region Slide the list elements in as they come into view
(function slideIn() {
	const listItems = document.querySelectorAll(".list li");
	if (!listItems.length) {
		return;
	}

	if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		listItems.forEach(el => {
			el.style.transition = "none";
			el.style.transform = "none";
			el.style.opacity = 1;
		});
		return;
	}

	let previousY = window.scrollY;

	const callback = entries => {
		const currentY = window.scrollY;
		entries.forEach(entry => {
			const { isIntersecting, target: el } = entry;
			if (!isIntersecting) {
				return;
			}

			// Animate intersecting elements when scrolling down
			if (currentY >= previousY) {
				el.style.transition = "1s";
			} else {
				// Don't show any animation for elements already scrolled past
				el.style.transition = "none";
			}
			el.style.transform = "none";
			el.style.opacity = 1;
			observer.unobserve(el);
		});

		previousY = currentY;
	};

	const observer = new IntersectionObserver(callback, {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	});

	listItems.forEach(el => observer.observe(el));
})();
//#endregion

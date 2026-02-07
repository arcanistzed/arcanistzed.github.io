/**
 * Generate random colors
 * @returns {number[]} Random colors
 */
function generateColors() {
	let colors;
	let attempts = 0;

	do {
		const one = generateHue(Math.floor(Math.random() * 360));
		const two = generateHue(one);
		const three = generateHue(one, two);
		colors = [one, two, three];
		attempts++;
		if (attempts > 10) {
			console.warn("Failed to generate colors after 10 attempts.");
			return [0, 0, 0]; // Fallback colors
		}
	} while (colors.includes(undefined));

	return colors;
}

/**
 * Apply the given colors to the page
 * @param {number[]} colors - Colors to apply
 */
async function applyColors(colors) {
	const rootStyle = root.style;
	rootStyle.setProperty(
		"--gradient",
		`linear-gradient(
            hsl(${colors[0]} 100% 10%),
            hsl(${colors[1]} 100% 10%)
        )`
	);
	rootStyle.setProperty("--square-color", `hsl(${colors[2]} 100% 10%)`);
	rootStyle.setProperty("--alt-text-color", `hsl(${colors[2]} 100% 90%)`);

	const tiles = document.querySelector(".tiles");
	if (!tiles) {
		console.warn("Tiles element not found.");
		return;
	}
	tiles.style.transition = "all 2s cubic-bezier(0.22, 1, 0.36, 1) 0s";
	tiles.style.transform = "translateY(-50px)";
	tiles.style.opacity = 0;

	setTimeout(() => {
		tiles.style.transform = "";
		tiles.style.opacity = "";
	}, 500);
}

/**
 * All allowed hues
 * @param {number[]} bases - Base hues to check against
 * @returns {number[]} Hues that validate certain rules from a given base hue
 */
function allAllowedHues(bases) {
	return (
		Array.from(new Array(360)) // Hue is in degrees
			.map((_, i) => i + 1) // Insert numbers into the Array from 1 to 300
			// Filter the Array
			.filter(h =>
				// Check if every base is compatible with this hue
				bases.every(
					base =>
						Math.abs(base - h) > 15 && // Must be sufficiently different than the base
						Math.abs(base - h) <= 100 && // Must not be too different
						(h < 50 || h > 150) // Must not be green
				)
			)
	);
}

/**
 * Generate a hue that is compatible with given base hues
 * @param {number[]} bases - Base hues to check against
 * @return {number} A hue that is compatible with the given base hues
 */
function generateHue(...bases) {
	const validHues = allAllowedHues(bases);
	const index = Math.floor(Math.random() * validHues.length);
	return validHues[index];
}

// Apply generated colors
await applyColors(generateColors());

/**
 * Generate random colors
 * @returns {number[]} Random colors
 */
function generateColors() {
	const one = generateHue(Math.floor(Math.random() * 360));
	const two = generateHue(one);
	const three = generateHue(one, two);
	const colors = [one, two, three];
	if (colors.some(c => c === undefined)) {
		console.warn("Re-attempting color generation...");
		return generateColors();
	}
	return colors;
}

/**
 * Apply the given colors to the page
 * @param {number[]} colors - Colors to apply
 */
async function applyColors(colors) {
	// Background
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

	// GitHub stats
	const altHex = hslToHex(colors[2], 100, 90);
	document.querySelector(
		"#github-stats img"
	).src = `https://github-readme-stats.vercel.app/api?username=arcanistzed&show_icons=true&title_color=${altHex}&text_color=fff&icon_color=${altHex}&bg_color=00000000&hide_border=true`;

	// Discord presence
	const id = "455117777745870860";
	const discordPresence = document.querySelector("#discord-presence");
	discordPresence.href = `https://discord.com/users/${id}`;
	discordPresence.querySelector("img").src = `https://lanyard.cnrad.dev/api/${id}?bg=00000000`;

	// Tiles
	const tiles = document.querySelector(".tiles");
	tiles.style.transition = "all 2s cubic-bezier(0.22, 1, 0.36, 1) 0s";
	tiles.style.transform = "translateY(-50px)";
	tiles.style.opacity = 0;

	setTimeout(() => {
		tiles.style.transform = "";
		tiles.style.opacity = "";
	}, 500);

	if (!(await (await fetch(`https://api.lanyard.rest/v1/users/${id}`)).json()).data.activities.length)
		discordPresence.remove();
}

/**
 * Convert a HSL color to Hex
 * @from https://stackoverflow.com/a/44134328
 * @param {number} h - Hue
 * @param {number} s - Saturation
 * @param {number} l - Lightness
 * @return {string} Hex color code
 */
function hslToHex(h, s, l) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = n => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0"); // convert to Hex and prefix "0" if needed
	};
	return `${f(0)}${f(8)}${f(4)}`;
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
applyColors(generateColors());

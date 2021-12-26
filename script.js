/**
 * Generate random colors
 * @returns {number[]} Random colors
 */
function generateColors() {
    const one = generateHue(Math.floor(Math.random() * 360));
    const two = generateHue(one);
    const three = generateHue(one, two);
    return [one, two, three];
};

/**
 * Apply the given colors to the page
 * @param {number[]} colors - Colors to apply
 */
function applyColors(colors) {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--gradient-color", `
        linear-gradient(
            hsl(${colors[0]} 100% 10%),
            hsl(${colors[1]} 100% 10%)
        )`);
    rootStyle.setProperty("--square-color", `hsl(${colors[2]} 100% 10%)`);
    rootStyle.setProperty("--alt-text-color", `hsl(${colors[2]} 100% 90%)`);
};

/**
 * All allowed hues
 * @param {number[]} bases - Base hues to check against
 * @returns {number[]} Hues that validate certain rules from a given base hue
 */
function allAllowedHues(bases) {
    return Array.from(new Array(360)) // Hue is in degrees
        .map((_, i) => i + 1) // Insert numbers into the Array from 1 to 300
        .filter(h => // Filter the Array
            bases.every(base => // Check if every base is compatible with this hue
                Math.abs(base - h) > 15 // Must be sufficiently different than the base
                && Math.abs(base - h) <= 100 // Must not be too different
                && (h < 50 || h > 150) // Must not be green
            ));
};

/**
 * Generate a hue that is compatible with given base hues
 * @param {number[]} bases - Base hues to check against
 * @return {number} A hue that is compatible with the given base hues
 */
function generateHue(...bases) {
    const validHues = allAllowedHues(bases);
    const index = Math.floor(Math.random() * validHues.length);
    return validHues[index];
};

applyColors(generateColors());

document.querySelectorAll("a").forEach(el => el.addEventListener("click", event => {
    event.preventDefault();
    window.open(el.href, "_blank");
}));
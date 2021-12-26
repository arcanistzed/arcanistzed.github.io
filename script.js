const colors = [];

const one = generateHue(Math.floor(Math.random() * 360));
const two = generateHue(one);
const three = generateHue(one, two);

colors.push(one, two, three);

document.querySelector("#gradient").style.backgroundImage = `linear-gradient(
                hsl(${colors[0]} 100% 10%),
                hsl(${colors[1]} 100% 10%)
                )`;
document.querySelector("#square").style.backgroundColor = `hsl(${colors[2]} 100% 10%)`;

function allAllowedHues(bases) {
    return Array.from(new Array(360)) // Hue is in degrees
        .map((_, i) => i + 1) // Insert numbers into the Array from 1 to 300
        .filter(h => // Filter the Array
            Math.abs(bases - h) > 15 // Must be sufficiently different than the base
            && Math.abs(bases - h) <= 100 // Must not be too different
            && (h < 50 || h > 150) // Must not be green
        );
};

function generateHue(...bases) {
    const validHues = allAllowedHues(bases);
    const index = Math.floor(Math.random() * validHues.length);
    return allAllowedHues(bases)[index];
};

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
    // Background
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--gradient", `
        linear-gradient(
            hsl(${colors[0]} 100% 10%),
            hsl(${colors[1]} 100% 10%)
        )`);
    rootStyle.setProperty("--square-color", `hsl(${colors[2]} 100% 10%)`);
    rootStyle.setProperty("--alt-text-color", `hsl(${colors[2]} 100% 90%)`);

    // GitHub stats
    const altHex = hslToHex(colors[2], 100, 90);
    document.querySelector("#github-stats").src = `https://github-readme-stats.vercel.app/api?username=arcanistzed&show_icons=true&title_color=${altHex}&text_color=fff&icon_color=${altHex}&bg_color=00000000&hide_border=true`;
};

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
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `${f(0)}${f(8)}${f(4)}`;
}

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
// Apply generated colors
applyColors(generateColors());

// List creation
const projects = [
    {
        name: "Ace Library",
        link: "https://foundryvtt.com/packages/acelib",
        description: "A library module for using the Ace editor in Foundry VTT",
        tags: ["Foundry VTT", "Ace", "Editor"]
    },
    {
        name: "Journal Code Editor",
        link: "https://foundryvtt.com/packages/jce",
        description: "A module for Foundry VTT that allows you to modify the source code of your Journal Entries using the editor library of your choice.",
        tags: ["Foundry VTT", "Editor"]
    },
    {
        name: "Atomizer",
        link: "https://www.npmjs.com/package/foundry-atomizer",
        description: "A build and extract tool for FoundryVTT database files",
        tags: ["Foundry VTT", "Database", "Build", "Extract"]
    },
    {
        name: "PF2e Sheet Toggle Banner",
        link: "https://foundryvtt.com/packages/toggle-banner",
        description: "A module for the Foundry VTT PF2E character sheet that adds a simple toggle to the red side banner",
        tags: ["Foundry VTT", "PF2e", "Sheet", "Banner"]
    },
    {
        name: "SCS",
        link: "https://foundryvtt.com/packages/scs",
        description: "An implementation of the Simultaneous Combat System for Foundry VTT",
        tags: ["Foundry VTT", "SCS"]
    },
    {
        name: "Default Context Menu",
        link: "https://foundryvtt.com/packages/dcm",
        description: "Use the default browser context menu in Foundry VTT",
        tags: ["Foundry VTT", "Context Menu"]
    },
    {
        name: "Export Sheet to PDF",
        link: "https://foundryvtt.com/packages/pdf-sheet",
        description: "A system agnostic tool to export your Foundry character sheet to a PDF!",
        tags: ["Foundry VTT", "Sheet", "PDF"]
    },
    {
        name: "Combat Tracker Groups",
        link: "https://foundryvtt.com/packages/ctg",
        description: "Group combatants in the Combat Tracker and roll for group initiative.",
        tags: ["Foundry VTT", "Combat Tracker", "Group"]
    },
    {
        name: "Sidebar Macros",
        link: "https://foundryvtt.com/packages/sidebar-macros",
        description: "Add Macros to the Foundry VTT sidebar!",
        tags: ["Foundry VTT", "Macros", "Sidebar"]
    },
    {
        name: "World Smiths Toolkit",
        link: "https://foundryvtt.com/packages/wst",
        description: "A toolkit for use in World Smiths products.",
        tags: ["Foundry VTT", "World Smiths"]
    }
];
// If ListJS is available
if (window?.List) {
    const options = {
        valueNames: [
            "name",
            { attr: "href", name: "link" },
            "description",
            "tags",
        ],
        item: `<li><a class="name link"></a><p class="description"></p><p class="tags"></p></li>`
    };
    const projectList = new List("project-list", options);
    projects.forEach(project => {
        // Add to list
        projectList.add({
            name: project.name,
            link: project.link,
            description: project.description,
            tags: project.tags.map(t => `#${t}`).join(", ")
        });
    });
};

// Random placeholder text in search box
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
    "I hope you are having a good day!"
];
document.querySelector("#search-box").placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

// Open projects when they are clicked on
document.querySelectorAll("#project-list li").forEach(el => el.addEventListener("click", event => {
    event.preventDefault();
    window.open(el.querySelector("a").href, "_blank");
}));

// Open links in new tab
document.querySelectorAll("a").forEach(el => el.addEventListener("click", event => {
    event.preventDefault();
    window.open(el.href, "_blank");
}));

// Handle go to top button
gotoTop = document.getElementById("gotoTop");
window.onscroll = () => {
    scrollFunction();
};

// Handle scrolling
function scrollFunction() {
    const root = document.documentElement;
    if (root.scrollTop > 20) {
        gotoTop.style.display = "block";
    } else {
        gotoTop.style.display = "none";
    };

    // If scroll position is after the top of the project list 
    if (root.scrollTop > document.querySelector("#project-list").offsetTop
        // and the bottom of the screen is before the bottom of the list
        && root.scrollTop + root.clientHeight < document.querySelector("#project-list").offsetTop + document.querySelector("#project-list").offsetHeight) {
        // Focus search box
        document.getElementById("search-box").focus();
    }
        // Unfocus search box
        searchBox.blur();
    };
};

// Handle goto top button
function topFunction() {
    document.documentElement.scrollTop = 0;
};

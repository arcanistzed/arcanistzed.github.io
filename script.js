const root = document.documentElement;
const gotoTop = document.getElementById("gotoTop");
const searchBox = document.getElementById("search-box");

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
    const rootStyle = root.style;
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
        tags: ["Foundry VTT", "Module", "Ace", "Library", "Editor"]
    },
    {
        name: "Journal Code Editor",
        link: "https://foundryvtt.com/packages/jce",
        description: "A module for Foundry VTT that allows you to modify the source code of your Journal Entries using the editor library of your choice.",
        tags: ["Foundry VTT", "Module", "Journal Entries", "Editor"]
    },
    {
        name: "Atomizer",
        link: "https://www.npmjs.com/package/foundry-atomizer",
        description: "A build and extract tool for FoundryVTT database files",
        tags: ["Foundry VTT", "NPM", "Database", "Build", "Extract"]
    },
    {
        name: "PF2e Sheet Toggle Banner",
        link: "https://foundryvtt.com/packages/toggle-banner",
        description: "A module for the Foundry VTT PF2E character sheet that adds a simple toggle to the red side banner",
        tags: ["Foundry VTT", "Module", "PF2e"]
    },
    {
        name: "Simultaneous Combat System",
        link: "https://foundryvtt.com/packages/scs",
        description: "An implementation of the Simultaneous Combat System for Foundry VTT",
        tags: ["Foundry VTT", "Module", "Combat"]
    },
    {
        name: "Default Context Menu",
        link: "https://foundryvtt.com/packages/dcm",
        description: "Use the default browser context menu in Foundry VTT",
        tags: ["Foundry VTT", "Module", "Context Menu", "Default"]
    },
    {
        name: "Export Sheet to PDF",
        link: "https://foundryvtt.com/packages/pdf-sheet",
        description: "A system agnostic tool to export your Foundry character sheet to a PDF!",
        tags: ["Foundry VTT", "Character", "PDF", "Export"]
    },
    {
        name: "Combat Tracker Groups",
        link: "https://foundryvtt.com/packages/ctg",
        description: "Group combatants in the Combat Tracker and roll for group initiative.",
        tags: ["Foundry VTT", "Module", "Combat Tracker", "Group"]
    },
    {
        name: "Sidebar Macros",
        link: "https://foundryvtt.com/packages/sidebar-macros",
        description: "Add a Macros tab to the Foundry VTT sidebar!",
        tags: ["Foundry VTT", "Module", "Macros", "Sidebar"]
    },
    {
        name: "World Smiths",
        link: "https://discord.gg/2YCFD8fxG7",
        description: "I'm the founder of the World Smiths Discord server where the community creates Foundry VTT worlds together.",
        tags: ["Foundry VTT", "Community", "World Building"]
    },
    {
        name: "World Smiths Toolkit",
        link: "https://foundryvtt.com/packages/wst",
        description: "A toolkit for use in World Smiths products.",
        tags: ["Foundry VTT", "Module", "World Smiths", "Journal Entries"]
    },
    {
        name: "The Sky Isles",
        link: "https://foundryvtt.com/packages/the-sky-isles",
        description: "A dnd5e preview for the Amazing Encounters & Places Kickstarter. Take your party to gorgeous earth motes high above the clouds, inhabited by monks from the Order of the Phoenix. Meet the docile winged leopards, scale the floating islands, learn about their culture. But don't fall!",
        tags: ["Foundry VTT", "World", "CZRPG"]
    },
    {
        name: "The Delian Tomb",
        link: "https://foundryvtt.com/packages/the-delian-tomb",
        description: "A low-level one shot adventure for introducing new players to DnD5e. This adventure was originally outlined in Matt Colville's first Running the Game video.",
        tags: ["Foundry VTT", "World", "MCDM", "Dungeon"]
    },
    {
        name: "Module compatibility checker",
        link: "https://docs.google.com/spreadsheets/d/1R9OhVbkRltwuu26bJALUj18VbrcZ_wZQmrbFgKfipB0/copy",
        description: "A spreadsheet that leverages the official spreadsheet to let you know which percentage of your module list is compatible with v9.",
        tags: ["Foundry VTT", "Spreadsheet", "Compatibility"]
    },
    {
        name: "Custom Fonts",
        link: "https://foundryvtt.com/packages/custom-fonts",
        description: "Facilitates using Custom Fonts in Journal Entries, Text Drawings on the canvas, or for the entire UI! You can upload your own font or load a font directly from Google Fonts.",
        tags: ["Foundry VTT", "Fonts", "Custom"]
    },
    {
        name: "Persist Sheets",
        link: "https://foundryvtt.com/packages/persist-sheets",
        description: "This module stores your opened sheets and it will reopen, resize, and re-arrange them after you reload or restart Foundry VTT.",
        tags: ["Foundry VTT", "Module", "Sheets"]
    },
    {
        name: "Multiline Text Drawings",
        link: "https://www.patreon.com/posts/multiline-text-61748891",
        description: "A module for Foundry VTT for automatically wrapping text in Drawings on the canvas.",
        tags: ["Foundry VTT", "Module", "Drawings", "Text"]
    },
    {
		name: "Progressive Web App",
		link: "https://foundryvtt.com/packages/pwa",
		description: "Install Foundry VTT as a Progressive Web App with its own shortcut and window.",
        tags: ["Foundry VTT", "Module", "PWA"],
	},
];
// If ListJS is available
if (globalThis?.List) {
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
            tags: project.tags?.map(t => `#${t}`)?.join(", ")
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

// Handle showing goto top button during scrolling
document.addEventListener("scroll", () => {
    if (root.scrollTop > 20) {
        gotoTop.style.display = "block";
    } else {
        gotoTop.style.display = "none";
    };
});
// Handle goto top button
function topFunction() {
    document.documentElement.scrollTop = 0;
};

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-PL71KBEP9H');

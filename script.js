const colors = ["Transparent", "Navy", "DarkBlue", "Blue", "Teal", "DarkCyan", "MidnightBlue", "RoyalBlue", "DarkSlateBlue", "Indigo", "CornflowerBlue"];
document.querySelector("#gradient").style.backgroundImage = `linear-gradient(0deg, ${colors[Math.round(Math.random() * colors.length)]}, ${colors[Math.round(Math.random() * colors.length)]})`;
document.querySelector("#square").style.backgroundColor = colors[Math.round(Math.random() * colors.length)];

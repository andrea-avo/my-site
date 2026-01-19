/* --- 1. Star --- */
function generateStars(className, count, variableName) {
  // Fungsi untuk membuat bintang menggunakan CSS box-shadow
  let shadow = ""; // Variabel penampung string bayangan

  for (let i = 0; i < count; i++) {
    // Star looping
    const x = Math.floor(Math.random() * 100); // Random x coordinate (0 - 100)
    const y = Math.floor(Math.random() * 100); // Random y coordinate (0 - 100)
    shadow += `${x}vw ${y}vh #fff, `; // Add coordinate to string shadow
  }

  shadow = shadow.slice(0, -2); // Remove the last comma and space to make the CSS format valid
  const element = document.querySelector(className); // Find the target HTML element (eg: .stars)
  if (element) {
    element.style.setProperty(variableName, shadow); // Insert the shadow string into a CSS variable
  }
}

/* --- 2. Cloud --- */
function generateClouds(count) {
  const container = document.getElementById("cloudsContainer"); // Retrieve the cloud container
  if (!container) return; // Stop if container does not exist

  container.innerHTML = ""; // Clear old contents

  const variants = ["cloud-v1", "cloud-v2", "cloud-v3"]; // List of cloud shape variations available in CSS

  for (let i = 0; i < count; i++) {
    // Create as many clouds as 'count'
    const cloud = document.createElement("div"); // Make new div

    cloud.classList.add(
      // Add a 'cloud' class & choose one random variation
      "cloud",
      variants[Math.floor(Math.random() * variants.length)]
    );

    const isReversed = Math.random() > 0.5; // Random logic of movement direction (50% chance of true/false)
    if (isReversed) cloud.style.animationName = "floatCloudReverse"; // If true, use reverse animation (right to left)

    cloud.style.top = `${Math.floor(Math.random() * 60) + 5}%`; // Random top position (5% to 65%)
    cloud.style.transform = `scale(${Math.random() * 0.6 + 0.6})`; // Random scale (0.6 to 1.2)
    cloud.style.opacity = Math.random() * 0.3 + 0.5; // Random opacity (0.5 to 0.8)
    cloud.style.animationDuration = `${Math.floor(Math.random() * 60) + 60}s`; // Random flight duration (60 to 120 seconds)
    cloud.style.animationDelay = `${Math.floor(Math.random() * -100)}s`; // Negative delay (so that clouds don't accumulate at the edges)
    container.appendChild(cloud); // Put the cloud into the container
  }
}

/* --- 3. Shooting Star --- */
function recycleStar(star) {
  // Function to reset the position of one star after the animation is finished
  const randomTop = Math.floor(Math.random() * 40) - 20; // Random appearing position in the top area (-20% to 20%)
  const randomLeft = Math.floor(Math.random() * 100); // Random appearing position on screen width (0% to 100%)
  const randomDuration = Math.random() * 3 + 4; // Animation duration: 4 to 7 seconds
  const randomDelay = Math.random() * 20 + 10; // Delay before reappearing: 10 to 30 seconds

  // Apply new style to star element
  star.style.top = `${randomTop}%`;
  star.style.left = `${randomLeft}%`;
  star.style.animationDuration = `${randomDuration}s`;
  star.style.animationDelay = `${randomDelay}s`;
}

function generateShootingStars(count) {
  const container = document.getElementById("shootingStarsContainer");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    recycleStar(star); // Set the initial position first
    star.style.animationDelay = `${Math.random() * 2}s`; // Override initial delay to appear immediately on first refresh
    star.addEventListener("animationiteration", () => recycleStar(star)); // Once done, call recycleStar to access the position again.
    container.appendChild(star);
  }
}

/* --- 4. Bird --- */
function generateBirds(count) {
  const container = document.getElementById("birdsContainer");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const bird = document.createElement("div"); // Main bird container
    bird.classList.add("bird");
    const wingL = document.createElement("div"); // Create left wings
    wingL.classList.add("bird-wing-left");
    const wingR = document.createElement("div"); // Create right wings
    wingR.classList.add("bird-wing-right");
    // Put the wings into the bird
    bird.appendChild(wingL);
    bird.appendChild(wingR);

    // Random Bird Properties
    const randomTop = Math.floor(Math.random() * 50) + 10; // Flying height
    const randomDuration = Math.floor(Math.random() * 20) + 30; // Velocity
    const randomDelay = Math.random() * -50; // Random start potition
    const randomScale = Math.random() * 0.5 + 0.5; // Scale

    // Apply new style to bird element
    bird.style.top = `${randomTop}%`;
    bird.style.transform = `scale(${randomScale})`;
    bird.style.animationDuration = `${randomDuration}s`;
    bird.style.animationDelay = `${randomDelay}s`;
    container.appendChild(bird);
  }
}

/* --- 5. Sun --- */
function randomizeSun() {
  const sun = document.querySelector(".sun-mover");
  if (sun) {
    const minimumSkip = 5; // Skip first 5 seconds
    const randomPart = Math.floor(Math.random() * 150); //The remaining 150 seconds are randomized
    const finalDelay = -(minimumSkip + randomPart); // Merge (always negative to keep animation-delay running)
    sun.style.animationDelay = `${finalDelay}s`;
  }
}

/* --- 6. Monn --- */
function randomizeMoon() {
  const moon = document.querySelector(".moon-mover");
  if (moon) {
    const minimumSkip = 5;
    const randomPart = Math.floor(Math.random() * 220);
    const finalDelay = -(minimumSkip + randomPart);
    moon.style.animationDelay = `${finalDelay}s`;
  }
}

// --- Execute the Above Functions ---
generateStars(".star-s", 150, "--star-s-shadow"); // Number of small stars
generateStars(".star-m", 25, "--star-m-shadow"); // Number of big stars
generateShootingStars(1); // Number of shooting stars
generateClouds(6); // Number of clouds
generateBirds(5); // Number of birds
randomizeSun(); // Random sun potition
randomizeMoon(); // Random moon potition

/* --- Time System --- */
document.getElementById("year").textContent = new Date().getFullYear(); // Automatic year

function updateSystem() {
  const now = new Date(); // Get the current time

  // Time Format Option
  const timeOptions = {
    timeZone: "Asia/Jakarta",
    hour12: false, // 24 hours
    hour: "2-digit",
    minute: "2-digit",
  };

  // Date Format Option
  const dateOptions = {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // Update time text on the screen
  document.getElementById("clock").textContent = now.toLocaleTimeString(
    "en-US", // Use en-US so the separator is a colon (:)
    timeOptions
  );

  // Update date text on the screen
  document.getElementById("date").textContent = now.toLocaleDateString(
    "en-GB", // Use en-GB for English
    dateOptions
  );

  // Take only the hour number (integer) for background logic
  const hour = parseInt(
    now.toLocaleTimeString("en-US", { ...timeOptions, minute: undefined })
  );

  const body = document.body;
  body.className = ""; // Reset class body

  // Logic of changing background based on hour
  let timeOfDay = "malam";
  if (hour >= 5 && hour < 11) timeOfDay = "pagi";
  else if (hour >= 11 && hour < 15) timeOfDay = "siang";
  else if (hour >= 15 && hour < 18) timeOfDay = "sore";

  //timeOfDay = "sore"; // Open this comment for force mode

  body.classList.add(timeOfDay); // Add class

  /* --- Moon Phase --- */
  if (timeOfDay === "malam") {
    // Check if the SunCalc library is loaded
    if (typeof SunCalc !== "undefined") {
      const moonData = SunCalc.getMoonIllumination(now); // Calculate lunar illumination based on current date
      const phase = moonData.phase; // Gets numbers 0.0 to 1.0
      const moonElement = document.getElementById("moonElement");
      const moonShadow = document.getElementById("moonShadow");

      moonElement.classList.remove("moon-new");
      const shadowColor = "rgba(10, 15, 30, 0.95)"; // Dark shadow color

      // If-Else logic to determine the shape of the moon shadow
      if (phase < 0.03 || phase > 0.97) {
        // New Moon - Close all
        moonElement.classList.add("moon-new");
        moonShadow.style.boxShadow = `inset 0 0 0 50px ${shadowColor}`;
      } else if (phase >= 0.48 && phase <= 0.52) {
        // Full Moon - No shadow
        moonShadow.style.boxShadow = "inset 0 0 0 0 transparent";
      } else if (phase < 0.25) {
        // Waxing Crescent - Thick shadow on the left
        moonShadow.style.boxShadow = `inset 25px 0 15px -5px ${shadowColor}`;
      } else if (phase < 0.48) {
        // Waxing Gibbous - Thin shadow on the left
        moonShadow.style.boxShadow = `inset 10px 0 10px -5px ${shadowColor}`;
      } else if (phase < 0.75) {
        // Waning Gibbous - Thin shadow on the right
        moonShadow.style.boxShadow = `inset -10px 0 10px -5px ${shadowColor}`;
      } else {
        // Waning Crescent - Thick shadow on the right
        moonShadow.style.boxShadow = `inset -25px 0 15px -5px ${shadowColor}`;
      }
    }
  }
}

setInterval(updateSystem, 100); // Execute updateSystem function every 0.1 second
updateSystem(); // Run once on first load (so you don't have to wait 1 second for it to appear)

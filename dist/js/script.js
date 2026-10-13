// JavaScript Lab: the project list is the single source for the cards on the homepage.
// To add a project, add one entry here and one 800x500 image in dist/img/projects.

const codeBase = "https://github.com/RoqayaMourad/JS-projects/tree/master/projects/";

const projects = [
  {
    name: "Car Booking",
    description: "A four-step booking form with ride details, vehicle choice, contact details and a summary. Routes and prices are simulated.",
    image: "car-booking.jpg",
    alt: "Car Booking ride details form with a route preview from Cairo International Airport to Giza Pyramids",
    demo: "https://roqayamourad.github.io/car-booking/",
    code: "https://github.com/RoqayaMourad/car-booking"
  },
  {
    name: "Budget App",
    description: "Set a budget, add, edit and delete expenses, and see the remaining balance. Data resets when you refresh the page.",
    image: "budget-app.jpg",
    alt: "Budget App with budget, expenses and balance totals above a list of four expenses",
    demo: "https://roqayamourad.github.io/budget-app/",
    code: "https://github.com/RoqayaMourad/budget-app"
  },
  {
    name: "ToDo List",
    description: "Add tasks, mark them done, delete them and filter by status. Tasks are saved in the browser.",
    image: "todo-list.jpg",
    alt: "ToDo List with four tasks, one of them marked as done",
    demo: "projects/9-TODO%20list/index.html",
    code: codeBase + "9-TODO%20list"
  },
  {
    name: "Bookmarker",
    description: "Save website names and links, open them in a new tab and delete them. Bookmarks are saved in the browser.",
    image: "bookmarker.jpg",
    alt: "Bookmarker form with saved bookmarks listed below it",
    demo: "https://roqayamourad.github.io/bookmarker-project/",
    code: "https://github.com/RoqayaMourad/bookmarker-project"
  },
  {
    name: "Drum Kit",
    description: "Play nine drum sounds with the A to L keys, a click or a tap.",
    image: "drum-kit.jpg",
    alt: "Drum Kit with nine keys labelled A to L over a photo of headphones",
    demo: "projects/7-DrumKit/index.html",
    code: codeBase + "7-DrumKit"
  },
  {
    name: "JavaScript Exercises",
    description: "Twenty beginner exercises on numbers, loops, arrays and strings. Each one takes an input and shows the result.",
    image: "javascript-exercises.jpg",
    alt: "JavaScript Exercises with one exercise open, showing the largest and smallest of three numbers",
    demo: "https://roqayamourad.github.io/javascript-exercise/",
    code: "https://github.com/RoqayaMourad/javascript-exercise"
  },
  {
    name: "Menu",
    description: "A restaurant menu with buttons that filter the dishes by category.",
    image: "menu.jpg",
    alt: "Restaurant menu with category buttons and dishes with photos and prices",
    demo: "projects/4-menu/index.html",
    code: codeBase + "4-menu"
  },
  {
    name: "Review Slider",
    description: "Step through four sample reviews with next, previous and random buttons.",
    image: "review-slider.jpg",
    alt: "Review Slider showing one review card with a photo, name and text",
    demo: "projects/3-reviews/index.html",
    code: codeBase + "3-reviews"
  },
  {
    name: "Video",
    description: "A full-screen background video with a switch to pause and play it.",
    image: "video.jpg",
    alt: "Video project with a desert scene playing behind the title and a pause switch",
    demo: "projects/5-video/index.html",
    code: codeBase + "5-video"
  },
  {
    name: "Color Flipper",
    description: "Click a button to get a random background color and its hex code.",
    image: "color-flipper.jpg",
    alt: "Color Flipper showing a green background and its hex code",
    demo: "projects/1-color-flipper/index.html",
    code: codeBase + "1-color-flipper"
  },
  {
    name: "Lorem Ipsum",
    description: "Choose a number of paragraphs and generate placeholder text.",
    image: "lorem-ipsum.jpg",
    alt: "Lorem Ipsum generator with three paragraphs of placeholder text",
    demo: "projects/6-lorem-ipsum/index.html",
    code: codeBase + "6-lorem-ipsum"
  },
  {
    name: "Fire Cursor",
    description: "A small flame follows the mouse pointer or a finger on a dark page.",
    image: "fire-cursor.jpg",
    alt: "Fire Cursor showing a small flame on a black page",
    demo: "projects/8-fire%20crusor/index.html",
    code: codeBase + "8-fire%20crusor"
  },
  {
    name: "Counter",
    description: "Increase, decrease or reset a number. The color shows whether it is positive or negative.",
    image: "counter.jpg",
    alt: "Counter showing the number 3 in green with decrease, reset and increase buttons",
    demo: "projects/2-counter/index.html",
    code: codeBase + "2-counter"
  }
];

// build one card: screenshot, name, description, Demo and Code links
function createCard(project, index) {
  const item = document.createElement("li");
  item.className = "project-card";

  const frame = document.createElement("div");
  frame.className = "project-image";
  const image = document.createElement("img");
  image.src = "dist/img/projects/" + project.image;
  image.alt = project.alt;
  image.width = 800;
  image.height = 500;
  // the first row is visible straight away, the rest load when they are near the screen
  if (index >= 3) {
    image.loading = "lazy";
  }
  frame.appendChild(image);

  const body = document.createElement("div");
  body.className = "project-body";

  const name = document.createElement("h3");
  name.className = "project-name";
  name.textContent = project.name;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;

  const links = document.createElement("div");
  links.className = "project-links";
  links.appendChild(createLink("Demo", project.demo, "button button-demo", project.name));
  links.appendChild(createLink("Code", project.code, "button button-code", project.name));

  body.appendChild(name);
  body.appendChild(description);
  body.appendChild(links);
  item.appendChild(frame);
  item.appendChild(body);
  return item;
}

function createLink(label, url, className, projectName) {
  const link = document.createElement("a");
  link.className = className;
  link.href = url;
  link.textContent = label;
  // screen readers hear which project the link belongs to
  link.setAttribute("aria-label", label + ": " + projectName);
  return link;
}

const grid = document.getElementById("project-grid");
projects.forEach(function (project, index) {
  grid.appendChild(createCard(project, index));
});

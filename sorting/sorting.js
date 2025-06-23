console.log("sorting.js loaded!");

// Function to display a titled list on the page
function displayList(title, list) {
  const container = document.createElement('div');
  container.style.marginBottom = '20px';

  const heading = document.createElement('h2');
  heading.textContent = title;
  container.appendChild(heading);

  const ul = document.createElement('ul');
  list.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  container.appendChild(ul);

  document.body.appendChild(container);
}

const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Yellowstone", "Waterfall"],
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Tetons"],
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    tags: ["Moderate", "Yellowstone", "Waterfall"],
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "2.2 miles",
    tags: ["Easy"],
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Moderate", "View"],
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

// Activity 1: Simple sort (case-sensitive)
const simpleSort = simpleList.slice().sort();
console.log("Simple sort (case-sensitive):", simpleSort);
displayList("Simple Sort (Case-Sensitive)", simpleSort);

// Activity 1 bonus: Case-insensitive sort
const caseInsensitiveSort = simpleList.slice().sort((a, b) => {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();
  if (lowerA < lowerB) return -1;
  if (lowerA > lowerB) return 1;
  return 0;
});
console.log("Case-insensitive sort:", caseInsensitiveSort);
displayList("Case-Insensitive Sort", caseInsensitiveSort);

// Descending compare function
function compareFnDescending(a, b) {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
}

// Descending sort (make a copy so original array stays unchanged)
const descendingSort = simpleList.slice().sort(compareFnDescending);
console.log("Descending sort:", descendingSort);
displayList("Descending Sort", descendingSort);
 

// Activity 2: Filtering a list of strings with a search query (case-insensitive)
function searchList(list, query) {
  function searchCallback(string) {
    // Check if query is included in string, ignoring case
    return string.toLowerCase().includes(query.toLowerCase());
  }
  return list.filter(searchCallback);
}

// Testing searchList function
console.log(searchList(simpleList, "b"));   // strings containing 'b' or 'B'
console.log(searchList(simpleList, "an"));  // strings containing 'an' (case-insensitive)

// Optional: Display search results on page
function displaySearchResults(query) {
  const results = searchList(simpleList, query);
  const container = document.createElement('div');
  container.style.marginBottom = '20px';

  const heading = document.createElement('h2');
  heading.textContent = `Search results for "${query}":`;
  container.appendChild(heading);

  const ul = document.createElement('ul');
  results.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  container.appendChild(ul);

  document.body.appendChild(container);
}

// Example usage on page
displaySearchResults("b");
displaySearchResults("an");


// Activity 3: Search and sort hikes by query in name, description, or tags

function searchList(list, query) {
  const lowerQuery = query.toLowerCase();

  // Filter hikes where query is in name, description, or tags
  const filtered = list.filter(hike => {
    // Search in name
    const nameMatch = hike.name.toLowerCase().includes(lowerQuery);

    // Search in description
    const descMatch = hike.description.toLowerCase().includes(lowerQuery);

    // Search in tags array using find
    const tagMatch = hike.tags.find(tag => tag.toLowerCase().includes(lowerQuery));

    return nameMatch || descMatch || tagMatch;
  });

  // Sort filtered hikes by numeric distance (ascending)
  filtered.sort((a, b) => {
    // Parse distance strings like "3 miles" to number 3
    const getDistance = distStr => parseFloat(distStr) || 0;
    return getDistance(a.distance) - getDistance(b.distance);
  });

  return filtered;
}

// Test it with query "al"
const filteredSortedHikes = searchList(hikes, "al");

// Log results to console
console.log("Filtered and sorted hikes for 'al':", filteredSortedHikes);

// Optionally display results on the page
function displayHikesList(title, hikesList) {
  const container = document.createElement('div');
  container.style.marginBottom = '20px';

  const heading = document.createElement('h2');
  heading.textContent = title;
  container.appendChild(heading);

  const ul = document.createElement('ul');
  hikesList.forEach(hike => {
    const li = document.createElement('li');
    li.textContent = `${hike.name} — ${hike.distance}`;
    ul.appendChild(li);
  });
  container.appendChild(ul);

  document.body.appendChild(container);
}

// Show filtered & sorted hikes on the page
displayHikesList("Filtered and Sorted Hikes for 'al'", filteredSortedHikes);
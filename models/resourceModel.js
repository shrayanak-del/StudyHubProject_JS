const resources = [
  {
    id: 1,
    title: "BBC Learning English",
    subject: "English",
    description: "Free English lessons, vocabulary and grammar resources.",
    url: "https://www.bbc.co.uk/learningenglish",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Khan Academy Maths",
    subject: "Maths",
    description: "Free mathematics lessons and practice exercises.",
    url: "https://www.khanacademy.org/math",
    level: "Beginner"
  },
  {
    id: 3,
    title: "freeCodeCamp",
    subject: "Computer Science",
    description: "Free programming and computer science learning resources.",
    url: "https://www.freecodecamp.org/learn",
    level: "Beginner"
  },
  {
    id: 4,
    title: "MDN Web Docs",
    subject: "Computer Science",
    description: "Detailed documentation for HTML, CSS and JavaScript.",
    url: "https://developer.mozilla.org/",
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Oxford Learner's Dictionaries",
    subject: "English",
    description: "Dictionary, vocabulary and pronunciation resources.",
    url: "https://www.oxfordlearnersdictionaries.com/",
    level: "Intermediate"
  },
  {
    id: 6,
    title: "Desmos",
    subject: "Maths",
    description: "Interactive graphing and mathematics tools.",
    url: "https://www.desmos.com/",
    level: "Intermediate"
  }
];

export function getAllResources() {
  return resources;
}

export function getResourceById(id) {
  return resources.find((resource) => resource.id === id);
}

export function getResourcesBySubject(subject) {
  const normalisedSubject = subject.toLowerCase();
  return resources.filter(
    (resource) => resource.subject.toLowerCase() === normalisedSubject
  );
}

export function searchResources(query) {
  const text = query.toLowerCase().trim();
  if (!text) return resources;

  return resources.filter((resource) =>
    `${resource.title} ${resource.subject} ${resource.description} ${resource.level}`
      .toLowerCase()
      .includes(text)
  );
}

export function addResource(resource) {
  const nextId = resources.length
    ? Math.max(...resources.map((item) => item.id)) + 1
    : 1;

  const newResource = { id: nextId, ...resource };
  resources.push(newResource);
  return newResource;
}

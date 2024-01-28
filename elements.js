const elementWithClasses = (elementName, cssClasses) => {
  const newElement = document.createElement(elementName);

  if (Array.isArray(cssClasses)) {
    newElement.classList.add(...cssClasses);

  } else {
    newElement.className = cssClasses;
  }

  return newElement;
}

const span = (cssClasses, text) => {
  const newElement = elementWithClasses('span', cssClasses)

  newElement.innerHTML = text;

  return newElement;
}

const p = (cssClasses, children) => {
  const newElement = elementWithClasses('p', cssClasses)

  newElement.append(...children);

  return newElement;
}

const h = (size) => {
  return (cssClasses, text) => {
    const newElement = elementWithClasses(`h${size}`, cssClasses)

    newElement.innerHTML = text;

    return newElement;
  }
}

const h1 = h(1);
const h2 = h(2);
const h3 = h(3);
const h4 = h(4);

const img = (cssClasses, src) => {
  const newElement = elementWithClasses('img', cssClasses);

  newElement.src = src;

  return newElement;
}

const div = (cssClasses, children = []) => {
  const newElement = elementWithClasses('div', cssClasses);

  newElement.append(...children);

  return newElement;
}
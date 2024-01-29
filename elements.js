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
  return (...arguments) => {
    if(arguments.length === 1){
      const newElement = elementWithClasses(`h${size}`, [])

    newElement.innerHTML = arguments[0];

    return newElement;
    }

    const newElement = elementWithClasses(`h${size}`, arguments[0])

    newElement.innerHTML = arguments[1];

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

const div = (...arguments) => {
  if(arguments.length === 1) {
    const newElement = elementWithClasses('div', []);

    newElement.append(...arguments[0]);
  
    return newElement;
  } else {
    const newElement = elementWithClasses('div', arguments[0]);

    newElement.append(...arguments[1]);
  
    return newElement;
  }
}
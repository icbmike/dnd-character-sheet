const elementWithClasses = (elementName, cssClasses) => {
    const newElement = document.createElement(elementName);

    if(Array.isArray(cssClasses)) {
        newElement.classList.add(...cssClasses);

    } else {
        newElement.className = cssClasses;
    }

    return newElement;
}

const p = (cssClasses, text) => {
    const newElement = elementWithClasses('p', cssClasses)

    newElement.innerHTML = text;
    
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

const div = (cssClasses, children = []) => {
    const newElement = elementWithClasses('div', cssClasses);
   
    newElement.append(...children);
    
    return newElement;
}

const spellCard = (spell) => 
    div('spellCard', [
        h1('name', spell.name),
        ...spell.description.split('\n').map(l => p('description', l))
    ]);

const spellCardList = (spellCards) => div('spellCards', spellCards);


const render = (rootElement, data) => {
    rootElement.append(
        spellCardList(data.spells.map(s => spellCard(s)))
    );
}
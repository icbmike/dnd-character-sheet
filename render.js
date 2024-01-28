const elementWithClasses = (elementName, cssClasses) => {
    const newElement = document.createElement(elementName);

    if(Array.isArray(cssClasses)) {
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

const spellAttribute = ( labelText, attributeText) => 
    p('spellAttribute', [span('spellAttributeLabel', `${labelText}: `), attributeText])
       
const spellCard = (spell) => 
    div('card', [
        h1('name', spell.name),
        spellAttribute('Casting time', spell.castingTime),
        spellAttribute('Duration', spell.duration),
        spellAttribute('Level', spell.level),
        spellAttribute('School', spell.school),
        ...spell.description.split('\n').map(l => p('description', l)),
        spellAttribute('At higher levels', spell.higherLevels),
        img('spellIcon', spell.imageSrc)
    ]);

const spellCardList = (spells) => div('cardList', spells.map(s => spellCard(s)));

const abilitiyCard = (ability) =>
    div('card', [
        h1('name', ability.name),
        ...ability.description.split('\n').map(l => p('description', l)),
    ])

const abilitiyCardList = (abilites) => div('cardList', abilites.map(a => abilitiyCard(a)))

const render = (rootElement, data) => {
    rootElement.append(
        h1('margin-bottom', 'Spells'),
        spellCardList(data.spells),
        h1('margin-bottom', 'Class Abilites'),
        abilitiyCardList(data.classAbilities)
    );
}
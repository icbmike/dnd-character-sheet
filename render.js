const scoreToModifier = (score) => Math.floor((score - 10) / 2)

const proficiencyBonus = (data) => 2 + Math.floor((data.level - 1) / 4)

const abilities = (abilities) =>
    div(['abilities',], Object.keys(abilities).map(k => div('ability', [
        div('abilityName', k),
        span('abilityScore', abilities[k]),
        span('abilityModifier', ` (${scoreToModifier(abilities[k])})`)
    ])));

const attribute = (labelText, attributeText, classList = []) =>
    p(['spellAttribute', ...classList], [span('spellAttributeLabel', `${labelText}: `), attributeText]);

const hitPoints = (data) =>
    div('hitPoints', [
        attribute('Max hit points', data.maxHitPoints)
    ]);

const savingThrows = (data) =>
    div('savingThrows', Object.keys(data.abilities).map(k => {
        const savingThrowValue = scoreToModifier(data.abilities[k]) + (['wisdom', 'charisma'].includes(k) ? proficiencyBonus(data) : 0);
        const sign = savingThrowValue > 0 ? '+' : '';

        return div('abilitySavingThrow', [
            div('abilityName', k),
            span('savingThrowModifier', `${sign}${savingThrowValue}`)
        ])
    }));

const stats = (data) =>
    div('margin-bottom', [
        attribute('Level', data.level),
        attribute('Proficiency Bonus', proficiencyBonus(data)),
        attribute('Speed', data.speed),
        attribute('Initiative', scoreToModifier(data.abilities.dexterity), ['margin-bottom']),
        hitPoints(data),
        div(['flex', 'margin-bottom'], [
            abilities(data.abilities),
            savingThrows(data)
        ])
    ]);

const spellCard = (spell) =>
    div('card', [
        h3('name', spell.name),
        attribute('Casting time', spell.castingTime),
        attribute('Duration', spell.duration),
        attribute('Level', spell.level),
        attribute('School', spell.school),
        ...spell.description.split('\n').map(l => p('description', l)),
        attribute('At higher levels', spell.higherLevels),
        img('spellIcon', spell.imageSrc)
    ]);

const spellCardList = (spells) => div('cardList', spells.map(s => spellCard(s)));

const abilitiyCard = (ability) =>
    div('card', [
        h3('name', ability.name),
        ...ability.description.split('\n').map(l => p('description', l)),
    ])

const abilitiyCardList = (abilities) => div('cardList', abilities.map(a => abilitiyCard(a)))

const render = (rootElement, data) => {
    rootElement.append(
        h1('margin-bottom', data.name),
        stats(data),
        h2('margin-bottom', 'Spells'),
        spellCardList(data.spells),
        h2('margin-bottom', 'Class abilities'),
        abilitiyCardList(data.classAbilities)
    );
}
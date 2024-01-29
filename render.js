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

const hitPoints = (data) => div('hitPointsAndTempHitPoints', [
    div('hitPoints', [
        attribute('Max hit points', data.maxHitPoints)
    ]),
    div('hitPoints tempHitPoints', 'Temp hit points'),
    div('hitDie', [
        attribute('Hit Die',  `${data.level}${data.hitDie}`)
    ])
]);

const savingThrows = (data) =>
    div('savingThrows',
        [
            h3('Saving Throws'),
            ...Object.keys(data.abilities).map(k => {
                const savingThrowValue = scoreToModifier(data.abilities[k]) + (['wisdom', 'charisma'].includes(k) ? proficiencyBonus(data) : 0);
                const sign = savingThrowValue > 0 ? '+' : '';

                return div('abilitySavingThrow', [
                    span('savingThrowModifierName', k),
                    span('savingThrowModifier', `${sign}${savingThrowValue}`)
                ])
            })
        ]
    );

const allSkills = {
    "strength": [
        'athletics',
    ],
    "dexterity": [
        'acrobatics',
        'sleight_of_hand',
        'stealth',
    ],
    "intelligence": [
        'arcana',
        'history',
        'investigation',
        'nature',
        'religion',
    ],
    "wisdom": [
        'animal_handling',
        'insight',
        'medicine',
        'perception',
        'survival'
    ],
    "charisma": [
        'deception',
        'intimidation',
        'performance',
        'persuasion',
    ]
};

const skillModifier = (ability, skill, data) =>
    scoreToModifier(data.abilities[ability]) + (data.skills.includes(skill) ? proficiencyBonus(data) : 0)

const skills = (data) => div('skills', [
    h3('Skills'),
    ...Object.keys(allSkills)
        .flatMap(k => allSkills[k].map(s => ({ ability: k, skill: s })))
        .sort((a, b) => a.skill > b.skill)
        .map(({ ability, skill }) => {
            const skillName = skill.split('_').join(' ');

            return div('skill', [
                span('skillName', skillName),
                ' ',
                span('skillModifier', skillModifier(ability, skill, data))
            ]);
        })
]);

const spellSlot = (spellLevel, total) => div('spellSlot', [
    div('spellSlotLevel', `Level ${spellLevel}`),
    div('spellSlotTotal', `Total slots ${total}`),
    div('spellSlotsUsedTally', '')
])

const spellCasting = (data) =>  div('spellSlots', [
    h3('margin-bottom', 'Spell Slots'),
    div('spellSlotsContainer', [
        spellSlot(1, 4),
        spellSlot(2, 3),
        spellSlot(3, 3),
    ])  
]);

const stats = (data) => [
    div('row margin-bottom', [
        div('stats', [
            h1('margin-bottom', data.name),
            attribute('Race', data.race),
            attribute('Level', data.level),
            attribute('Speed', data.speed),
            attribute('Initiative', scoreToModifier(data.abilities.dexterity)),
            attribute('Proficiency Bonus', proficiencyBonus(data)),
            attribute('Armor Class', data.armorClass),
            attribute('Spellcasting Ability', 'Wisdom'),
            attribute('Spell Attack Bonus', scoreToModifier(data.abilities.wisdom) + proficiencyBonus(data)),
            attribute('Spell Save DC', 8 + scoreToModifier(data.abilities.wisdom) + proficiencyBonus(data))
        ]),
        div([
            hitPoints(data),
            spellCasting(data)
        ]),
    ]),
    div(['abilitiesAndSavingThrows', 'margin-bottom'], [
        abilities(data.abilities),
        savingThrows(data),
        skills(data)
    ])
];

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
        ...stats(data),
        h2('margin-bottom', 'Spells'),
        spellCardList(data.spells),
        h2('margin-bottom', 'Class abilities'),
        abilitiyCardList(data.classAbilities)
    );
}
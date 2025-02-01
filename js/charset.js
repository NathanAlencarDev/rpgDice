class Character {
    constructor(name, race, characterClass, element) {
        this.name = name;
        this.race = race;
        this.characterClass = characterClass;
        this.element = element;
        this.attributes = {
            strength: 0,
            control: 0,
            agility: 0,
            dexterity: 0,
            perception: 0
        };
        this.hp = 100;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    useItem(itemName) {
        const itemIndex =this.items.findItem(item => item.name === itemName);
        if (itemIndex !== -1) {
            const item = this.items[itemIndex];
            item.use(this);
            this.items.splice(itemIndex, 1);
        }
    }
}

class Item {
    constructor(name, effect) {
        this.name = name;
        this.effect = effect;
    }

    use(character) {
        this.effect(character);
    }
}

// Base para a Criação de um personagem
const player1 = new Character('Aragorn', 'Humano', 'Gerreiro', 'Fogo');
player1.attributes.strength = 8;
player1.attributes.control = 5;
player1.attributes.agility = 6;
player1.attributes.dexterity = 4;
player1.attributes.perception = 7;

const player2 = new Character('Legolas', 'Elfo', 'Arqueiro', 'Ar');
player2.attributes.strength = 5;
player2.attributes.control = 8;
player2.attributes.agility = 9;
player2.attributes.dexterity = 7;
player2.attributes.perception = 6;

// base para a criação de itens.
const healthPotion = new Item('Poção de Vida', (character) => {
    character.hp += 20;
    console.log(`${character.name} recuperou 20 HP!`);
});

player1.addItem(healthPotion);
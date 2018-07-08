const clearArea = 5;

export const dataForMagicAction = {
    'heroVertical': {
        'xPos': 830,
        'yPos': 30,
        'axis': 'dy',
        'increment': 5,
        'clearArea': clearArea,
        'stop': 290,
        'direction': 'positive'
    },
    'zombieVertical': {
        'xPos': 100,
        'yPos': 30,
        'axis': 'dy',
        'increment': 5,
        'clearArea': clearArea,
        'stop': 290,
        'direction': 'positive'
    },
    'heroHorizontal': {
        'xPos': 190,
        'yPos': 390,
        'axis': 'dx',
        'increment': 5,
        'clearArea': clearArea,
        'stop': 750,
        'direction': 'positive'
    },
    'zombieHorizontal': {
        'xPos': 750,
        'yPos': 390,
        'axis': 'dx',
        'increment': -5,
        'clearArea': clearArea,
        'stop': 190,
        'direction': 'negative'
    }
};

export const spells = ['blackStone', 'stone', 'fire', 'fireFist'];

export const attackType = {
    'hero': ['heroVertical', 'heroHorizontal'],
    'zombie': ['zombieVertical', 'zombieHorizontal']
};
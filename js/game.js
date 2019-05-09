const createGame = sprite => {

    let secretWord = '';
    let step = 1;
    let arrayGaps = [];

    const setGaps = () => arrayGaps = Array(secretWord.length).fill('');

    const getGaps = () => arrayGaps;

    const nextStep = () => step = 2;

    const getStep = () => step;

    const win = () => arrayGaps.indexOf("")==-1 && arrayGaps.length > 0;    

    const lose = () => sprite.isFinished();

    const winOrLose = () => lose() || win();

    const setSecretWord = word => {
        if(!word.trim()) throw Error('Invalid Word');

        secretWord = word;
        setGaps();
        nextStep();
    };

    const restart = () => {
        sprite.reset();
        secretWord = '';
        step = 1;
        arrayGaps = [];   
    };  

    const processHint = character => {
        if(!character.trim()) throw Error('Invalid Hint');

        const regEx = new RegExp(character, 'gi');
        let result, correctHint = false;

        while (result = regEx.exec(secretWord)) {
            correctHint = arrayGaps[result.index] = character;   //correctHint is a boolean. When it receives a value here, it changes to true.
        }

        if (!correctHint) sprite.nextFrame();   
    };
    
    return {
        setSecretWord,
        getGaps,
        getStep,
        processHint,
        win,
        lose,
        winOrLose, 
        restart
    };
};
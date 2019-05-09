var createGame = function (sprite) {

    let secretWord = '';
    let step = 1;
    let arrayGaps = [];

    var setSecretWord = word => {

        if(!word.trim()) throw Error('Invalid Word');

        secretWord = word;
        setGaps();
        nextStep();
    };

    var setGaps = () => {

        arrayGaps = Array(secretWord.length).fill('');

    };

    var getGaps = function () {

        return arrayGaps;

    };

    var nextStep = () => {

        step = 2;
    };

    var getStep = function () {

        return step;
    };

    var processHint = character => {

        if(!character.trim()) throw Error('Invalid Hint');

        let regEx = new RegExp(character, 'gi')
            ,result
            ,correctHint = false;

        while (result = regEx.exec(secretWord)) {
            
            correctHint = arrayGaps[result.index] = character;   //correctHint is a boolean. When it receives a value here, it changes to true.
        }

        if (!correctHint) sprite.nextFrame();
        
    };

    var win = function () {                     
                                                // ternary if -> if the arrayGaps.length = 0 return false, if not resolve 'some'.
       /*  return arrayGaps.length
        ? !arrayGaps.some(gap => {             // 'some' scans the array item by item and returns true if it finds the searched value,
            return gap == '';                  // in this case empty '', if it does not find, return false. As we want it to be the inverse, 
        })                                     // we put '!' at the beginning of the return, so if the person already filled the entire array, '' will not be found
        : false;   */                             //'some' will return false then the value is inverted by '!' returning true.
                                        
        
        
        /* let verifyVictory = true;
        if(step === 1) verifyVictory = false;
        
        for (i=0; i<arrayGaps.length; i++) {                    //another way to do
            
            if (arrayGaps[i] === '') verifyVictory = false;
        }
        
        return verifyVictory; */
        
        return arrayGaps.indexOf("")==-1 && arrayGaps.length > 0

    };

    var lose = function () {
        return sprite.isFinished();
    };

    var winOrLose = function () {
        return lose() || win();
    };

    var restart = function () {
        sprite.reset();
        secretWord = '';
        step = 1;
        arrayGaps = [];
        
    };
    return {

        setSecretWord: setSecretWord,
        getGaps: getGaps,
        getStep: getStep,
        processHint: processHint,
        win: win,
        lose: lose,
        winOrLose: winOrLose, 
        restart: restart
    };
};
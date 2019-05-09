$(() => {
    createController(
        createGame(                         // it will run when the page loads.
            createSprite('.sprite')
        )
    ).start();
})

const createController = game => {

    const $entry = $('.entry');
    const $gap = $('.gaps');

    // Search the gaps game.getGaps() and display them to the player
    const showGaps = () => {

        $gap.empty();
        jogo.getLacunas().forEach(gap => {
            $('<li>')                                       
                .addClass('gap')
                .text(gap)
                .appendTo($gap);
        });

    };

    // change the placeHolder and clean the input field    
    const changePlaceHolder = text => $entry.val('').attr("placeholder", text);

    // passes to game.setSecretWord() the value entered by the player and calls the `showGaps()` and `changePlaceHolder()` functions. 
    const saveSecretWord = () => {

        try {

            game.setSecretWord($entry.val().trim());   //trim() to avoid the white spaces.
            changePlaceHolder("Hint");
            showGaps();

        } catch (err) {
            alert(err.message);
        }
    };

    // restart the game if the player win or lose the game!
    const restart = () => {

        $gap.empty();
        changePlaceHolder("Secret Word");
        game.restart();
    }

    //read the player hint process it and show in the view. Then check to see if the player has won or lost.
    const readHint = () => {
        try {
            game.processHint($entry.val().trim().substr(0, 1));
            showGaps();
            $entry.val('');

            if (game.winOrLose()) {

                setTimeout(() => {
                    if (game.win()) alert("You WIN!!\n Congratulations!");
                    else alert("You LOSE!!\n Try again!");
                    restart();
                }, 100);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    // Make the keypress event association to capture the player input every time he press ENTER.
    const start = () => {

        $entry.keypress(event => {
            if (event.which == 13) {
                switch (game.getStep()) {
                    case 1:
                        saveSecretWord();
                        break;
                    case 2:
                        readHint();
                        break;
                }
            }
        });
    };

    // returns an object with the start property, which must be called as soon as the controller is created
    return { start };

};
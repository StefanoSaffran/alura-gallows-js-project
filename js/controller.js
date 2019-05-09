$(() => {

    createController(
        createGame(
            createSprite('.sprite')
        )
    ).start();
})

var createController = function (game) {

    var $entry = $('.entry');
    var $gap = $('.gaps');

    // Search the gaps game.getGaps() and display them to the player
    var showGaps = function () {

        $gap.empty();

        let arrayGaps = game.getGaps();

        for (i = 0; i < arrayGaps.length; i++) {
            let liGap = $("<li>");
            liGap
                .text(arrayGaps[i])
                .addClass("gap")
                .appendTo($gap);
        }

        /* jogo.getLacunas().forEach(function (lacuna) {
            $('<li>')                                       // another solution using forEach
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        }); */
    };

    // change the placeHolder and clean the input field    
    var changePlaceHolder = function (text) {

        $entry
            .val('')
            .attr("placeholder", text);
    };

    // passes to game.setSecretWord() the value entered by the player and calls the `showGaps()` and `changePlaceHolder()` functions. 
    var guardaPalavraSecreta = function () {

        try {

            game.setSecretWord($entry.val().trim());   //trim() to avoid the white spaces.
            changePlaceHolder("Hint");
            showGaps();

        } catch (err) {
            alert(err.message);
        }
    };

    // restart the game if the player win or lose the game!
    var restart = function () {

        $gap.empty();
        changePlaceHolder("Secret Word");
        game.restart();
    }

    //read the player hint process it and show in the view. Then check to see if the player has won or lost.
    var readHint = function () {
        try {
            game.processHint($entry.val().trim().substr(0, 1));
            showGaps();
            $entry.val('');

            if (game.winOrLose()) {

                setTimeout(function () {
                    if (game.win()) alert("You WIN!!\n Congratulations!");
                    else alert("You LOSE!!\n Try again!");
                    restart();
                }, 500);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    // do the keypress event association to capture the player input every time he press ENTER.
    var start = function () {

        $entry.keypress(function (event) {
            if (event.which == 13) {
                switch (game.getStep()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        readHint();
                        break;
                }
            }
        });
    };

    // returns an object with the start property, which must be called as soon as the controller is created
    return { start: start };

};
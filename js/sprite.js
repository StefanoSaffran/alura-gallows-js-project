/* $(() => {
    var sprite = createSprite('.sprite');

    setInterval(function () {
        sprite.nextFrame();
    }, 500);
}) */

var createSprite = function (selector) {

    var hasNext = function () {

        var next = currentFrame + 1;
        return next <= last;
    };

    var moveFrame = function (from, to) {

        $element.removeClass(from)
            .addClass(to);
    };
    
    var nextFrame = function () {

        if (hasNext()) moveFrame(frames[currentFrame], frames[++currentFrame]);
    };

    var reset = () => {

        moveFrame(frames[currentFrame], frames[0])
        currentFrame = 0;
    };

    var isFinished = () => {

        return !hasNext();
    }

    var currentFrame = 0;
    var $element = $(selector);

    var frames = [
        'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
        'frame6', 'frame7', 'frame8', 'frame9'
    ];

    $element.addClass(frames[currentFrame]);
    var last = frames.length - 1;


    return {
        nextFrame: nextFrame,
        reset: reset,
        isFinished: isFinished
    };

};
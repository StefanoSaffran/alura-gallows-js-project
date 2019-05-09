const createSprite = selector => {

    const isFinished = () => !hasNext();

    const hasNext = () => current + 1 <= last;

    const moveFrame = (from, to) => {

        $element.removeClass(from)
            .addClass(to);
    };
    
    const nextFrame = () => {

        if (hasNext()) moveFrame(frames[current], frames[++current]);
    };

    const reset = () => {

        moveFrame(frames[current], frames[0])
        current = 0;
    };

    let current = 0;
    const $element = $(selector);

    const frames = [
        'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
        'frame6', 'frame7', 'frame8', 'frame9'
    ];

    $element.addClass(frames[current]);
    const last = frames.length - 1;

    return {
        nextFrame,
        reset,
        isFinished
    };

};
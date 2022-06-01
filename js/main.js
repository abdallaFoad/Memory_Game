 //select the start game button
 document.querySelector('.control-button span').onclick = function () {
    //prompt to  write your name
    let yourName = prompt('What Is Your Name?');
    
    if (yourName == null || yourName == '') {
        //if name is empty
        document.querySelector('.info-container .name span').innerHTML = 'Unknow';
    } else {
        //name is no empty
        document.querySelector('.info-container .name span').innerHTML = yourName;
    }
    //remove the splash screen
    // document.querySelector('.control-button').remove();
    this.parentElement.remove();
 };
//effect duration
 let duration = 1000;

 //select blocks container
 let blocksControl = document.getElementById('memory-game-blocks');

 //get array from children of blocks container
 let blocks = Array.from(blocksControl.children);

        //create  range of keys (Method 1)
 let orderRange = [... Array(blocks.length).keys()];

        //create  range of keys (Method 2)
//let orderRange = Array.from(Array(blocks.length).keys());

// function shuffle
shuffle(orderRange);

 //let mOrderRange = [2, 12, 5, 14, 3, 8, 0, 10, 6, 15, 7, 17, 9, 19, 1, 11, 4, 13, 16, 18];

blocks.forEach((block, index) => {

    //Add order css property to game block
    block.style.order = orderRange[index];

    // add event click on block
    block.addEventListener('click', function () {

        flipBlock(block);
    });
});

function flipBlock(selectedBlock) {

    //add class is-flipped
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        //stop Clicking function
        stopClicking();

        // cheak match blocks function
        cheakMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
        
    }
};

//stop Clicking function
function stopClicking() {

    //add class list no-Clicked on blockControl
    blocksControl.classList.add('no-Clicked');

    setTimeout(() => {

        //remove class list no-Clicked on blockControl
        blocksControl.classList.remove('no-Clicked');

    }, duration);
};

//cheak match block function
function cheakMatchedBlocks(firstBlock, secondBlock){

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        
        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration)

        document.getElementById('fail').play();

    }
}


// shuffle function
function shuffle(array) {

    //settings var
    let current = array.length,
        random,
        temp;

    while (current > 0) {

        //get random number
        random = Math.floor(Math.random() * current);

        //decrease length by one
        current--;

        //[1]save current element in box
        temp = array[current];

        //[2] current element = random element
        Array[current] = array[random];

        //[3]random element = get element from box
        array[random] = temp;
    }
    return array;
};



// initializes a ton of arrays

// contains filepaths to the different images used
const pointer = ["images/img_1.jpg", "images/img_2.jpg", "images/img_3.jpg", "images/img_4.jpg"];

// contains the captions used
const info = ["Northern Lights", "Mountains and Fjords", "Nature and Sunrise", "Snowy Mountain"];

// creates functions to actively update multiple items
function image(data, range) {
    for (let i in range) {
        document.getElementsByClassName("image")[i].src = data;
    }
}

function counter(data, range) {
    for (let i in range) {
        document.getElementsByClassName("counter")[i].innerHTML = data;
    }
}

function caption(data, range) {
    for (let i in range) {
        document.getElementsByClassName("caption")[i].innerHTML = data;
    }
}

function selector(data, i) {
    document.getElementsByClassName("selector")[i].className = data;
}


// sets the first image and creates index, which stores the current slide
image(pointer[index = 0], [0, 1]);

// runs overlaySync() to initalize the base state of the slideshow
overlaySync();

// when called with either a 1 or a -1, calls move() with that value applied to the index
// if the index would go out of range between 0 and 3, it wraps
function stepIndex(direction, num = index+direction) {
    move(3*(num<0)+num*(num>0&&num<4));
}

// updates the counter and caption, and sets the index number selector to active
function overlaySync() {
    counter(`${index + 1}/4`, [0, 1]);
    caption(info[index], [0, 1]);
    selector("selector active", index);
}

// sets the current selector to inactive, then sets the index and image to whatever is given
// also calls overlaySync() to update non image components
function move(amount) {
    selector("selector", index)
    image(pointer[index = amount], [0, 1]);
    overlaySync();
}

function callModal(value) {
    if (value>0) { 
        document.getElementById("modal").style.display ="block";
    }
    else { document.getElementById("modal").style.display ="none"; }
}
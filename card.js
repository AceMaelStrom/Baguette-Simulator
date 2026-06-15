function Animate(card) {
    let angleturn = 8;
    let frames = [8,-4,2,-1,0];

    let i = 0;

    const interval = setInterval(() => {
        card.style.transform = `rotate(${frames[i]}deg)`;

        i++;
        if (i >= frames.length) {
            clearInterval(interval);
            card.style.transform = "rotate(0deg)";
        }
    }, 35);
};

const card = document.querySelector(".noodel")


let dragging = false;
let offsetfromX;
let offsetfromY;



/*moving script*/

card.addEventListener("mousedown", (e) => {
    let cardarea = card.getBoundingClientRect();
    dragging = true;
    offsetfromX = e.clientX - card.offsetLeft;
    offsetfromY = e.clientY - card.offsetTop;

    /*pivot establish*/

    let pivotX = e.clientX - cardarea.left;
    let pivotY = e.clientY - cardarea.top;

    card.style.transformOrigin = `${pivotX}px ${pivotY}px`;

    //animation!

    Animate(card);


});

document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    card.style.left = (e.clientX - offsetfromX) + "px";
    card.style.top = (e.clientY - offsetfromY) + "px";
});

document.addEventListener("mouseup", () => {
    dragging = false;
});



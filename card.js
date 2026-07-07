let activecard = null;
let offsetfromX = 0;
let offsetfromY = 0;
let layer = 0;

const card = document.querySelector(".noodel");
const stack = new Map();

card.dataset.id = crypto.randomUUID();

stack.set(card.dataset.id, {
    parent: null,
    children: []
});



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

function spawncard(){
    
    const button = document.getElementById("spawner");
    const spawnarea = document.getElementById("workspace");


    //dummy cards

    button.addEventListener("click", () => {
        const newcard = document.createElement("div");

        let ID = crypto.randomUUID();

        newcard.className = "noodel";
        newcard.dataset.id = ID;
        newcard.style.position = "absolute";
        newcard.innerHTML = `
            <p>dummy text</p>
            <div class = "intranode">
                <p style="padding-bottom: 20px;">dummytext</p>
                
                <div class = "nodeconnectors">
                    <div class = "stack-left">
                        <div class = "input" data-type="input"></div>
                    </div>
                    <div class = "stack-right">
                        <div class = "output" data-type="output"></div>
                    </div>
                </div>
            </div>
            <p id="energylevel">Cost: </p>
        `;
        stack.set(ID,  {
            parent: null, children: []
        })

        spawnarea.appendChild(newcard);

        dragon(newcard);

    });

};

/*moving script*/

function dragon(card) {

    card.addEventListener("mousedown", (e) => {
        activecard = card;


        let cardarea = card.getBoundingClientRect();

        offsetfromX = e.clientX - card.offsetLeft;
        offsetfromY = e.clientY - card.offsetTop;


        console.log("cardID: ", activecard.dataset.id)

        /*pivot establish*/

        let pivotX = e.clientX - cardarea.left;
        let pivotY = e.clientY - cardarea.top;

        card.style.transformOrigin = `${pivotX}px ${pivotY}px`;

        layer++;
        card.style.zIndex = layer;
        


        //animation!

        Animate(card);


    });
}

function nodeconnect() {


};
//to detect overlay

function overlapdetector(card1,card2) {
    const c1 = card1.getBoundingClientRect();
    const c2 = card2.getBoundingClientRect();
    return !(
        c1.right < c2.left ||
        c1.left > c2.right ||
        c1.bottom < c2.top ||
        c1.top > c2.bottom
    );


};

function stackcards(node1, node2){
    const node1ID = node1.dataset.id
    const node2ID = node2.dataset.id
        
    const node1info = stack.get(node1ID);
    const node2info = stack.get(node2ID);

    if (!node1info || !node2info) {
        console.error("Card not found in stack map");
        return;
    }

    node1info.parent = node2ID;
    node2info.children.push(node1ID);


    console.log(`${node2ID} is on ${node1ID}`)

};


document.addEventListener("mousemove", (e) => {
        if (!activecard) return;

        activecard.style.left = (e.clientX - offsetfromX) + "px";
        activecard.style.top = (e.clientY - offsetfromY) + "px";
    });

document.addEventListener("mouseup", () => {
        

    const cards = document.querySelectorAll(".noodel");

    if (!activecard) return;

    for (const other of cards) {
        if (other === activecard) continue;
        if (overlapdetector(activecard, other)) {
            break;
        }
    };

    activecard = null;
});

document.addEventListener("                                 ")

dragon(card);

spawncard();



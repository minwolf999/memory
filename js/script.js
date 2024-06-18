const container = document.getElementById("container");

let images = new Map();

images.set("image/a.png", "image/a2.png");
images.set("image/a2.png", "image/a.png");

images.set("image/b.png", "image/b2.png");
images.set("image/b2.png", "image/b.png");

images.set("image/c.png", "image/c2.png");
images.set("image/c2.png", "image/c.png");

images.set("image/d.png", "image/d2.png");
images.set("image/d2.png", "image/d.png");

images.set("image/e.png", "image/e2.png");
images.set("image/e2.png", "image/e.png");

images.set("image/f.png", "image/f2.png");
images.set("image/f2.png", "image/f.png");

images.set("image/g.png", "image/g2.png");
images.set("image/g2.png", "image/g.png");

images.set("image/h.png", "image/h2.png");
images.set("image/h2.png", "image/h.png");

images.set("image/i.png", "image/i2.png");
images.set("image/i2.png", "image/i.png");

let tableau = Array.from(images.entries());
shuffle(tableau);
let maMapMélangée = new Map(tableau);

maMapMélangée.forEach((k, _) => {
    let card = document.createElement("div");

    let front = document.createElement("div");
    front.id = "front";
    front.className = "front";

    let frontImage = document.createElement("img");
    frontImage.src = "image/front.png";

    front.appendChild(frontImage);
    card.appendChild(front);
    
    let back = document.createElement("div");
    back.id = "back";
    back.className = "back";

    let backImage = document.createElement("img");
    backImage.src = k;

    back.appendChild(backImage);
    card.appendChild(back);

    card.onclick = function() {
        Switch(this);
    };
    card.className = "card";
    card.style.transform = "rotateY(180deg)";

    container.appendChild(card)
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
};

function Switch(element) {

    var imagePath = element.querySelector(".back").querySelector("img").src.split("/");

    var imagesSimilar1 = document.querySelectorAll('img[src="'+ imagePath[imagePath.length-2] + "/" + imagePath[imagePath.length-1] +'"]');
    var imagesSimilar2 = document.querySelectorAll('img[src="'+ maMapMélangée.get(imagePath[imagePath.length-2] + "/" + imagePath[imagePath.length-1]) +'"]');

    let count = 0;
    maMapMélangée.forEach((image1, image2) => {
        let tmp1 = document.querySelectorAll('img[src="'+ image1 +'"]');
        let tmp2 = document.querySelectorAll('img[src="'+ image2 +'"]');
        
        if (tmp1[0].parentNode.style.display === "block" || tmp2[0].parentNode.style.display === "block") {
            count++;
        }
    });

    if (count > 2) {
        maMapMélangée.forEach((image1, image2) => {
            let tmp = document.querySelectorAll('img[src="'+ image1 +'"]');
            let tmps = document.querySelectorAll('img[src="'+ image2 +'"]');

            let tmp1 = tmp[0].parentNode.parentNode;
            let tmp2 = tmps[0].parentNode.parentNode;

            if (tmp1.querySelector(".front").style.display !== "block") {
                tmp1.querySelector(".front").style.display = "block";
                tmp1.querySelector(".back").style.display = "none";

                tmp1.querySelector(".back").parentNode.style.transform = "rotateY(180deg)";
            }
            
            if (tmp2.querySelector(".front").style.display !== "block") {
                tmp2.querySelector(".front").style.display = "block";
                tmp2.querySelector(".back").style.display = "none";

                tmp2.querySelector(".front").parentNode.style.transform = "rotateY(180deg)";
            }
            
        });

        return;
    }

    element.querySelector(".front").style.display = "none";
    element.querySelector(".back").style.display = "block";

    element.querySelector(".front").parentNode.style.transform = "rotateY(0deg)";

    if (element.children[1] !== imagesSimilar1[0].parentNode && imagesSimilar1[0].parentNode.style.display == "block" || element.children[1] !== imagesSimilar2[0].parentNode && imagesSimilar2[0].parentNode.style.display == "block") {
        document.querySelectorAll('img[src="'+ maMapMélangée.get(imagePath[imagePath.length-2] + "/" + imagePath[imagePath.length-1]) +'"]')[0].parentNode.parentNode.onclick = null;
        element.onclick = null;

        maMapMélangée.delete(maMapMélangée.get(imagePath[imagePath.length-2] + "/" + imagePath[imagePath.length-1]))
        maMapMélangée.delete(imagePath[imagePath.length-2] + "/" + imagePath[imagePath.length-1])
    }
}

const url = "http://localhost:3000/inspo";

let addInspo = false;

const inspoFormContainer = document.querySelector(".container");
const getInspoBttn = document.querySelector("#get-inspo-btn");
let loaded = false

document.addEventListener("DOMContentLoaded", () => {
    const inspoCollection = document.getElementById("inspo-collection")

    getInspoBttn.addEventListener("click", () => {
        // hide & seek with the form 

        addInspo = !addInspo;
        if (addInspo) {
            inspoFormContainer.style.display = "block";
            inspoCollection.style.display = "block";
        } else {
            inspoFormContainer.style.display = "none";
            inspoCollection.style.display = "none";
        }
        if (loaded === false){
            fetch(url)
            .then(response => response.json())
            .then(renderInspoCards)
            .then(loaded=true);
        }
        

        function renderInspoCards(inspo){
            let bucket = [];

            for (let i=0;i<=17;i++) {
                bucket.push(i);
            }

            function getRandomFromBucket() {
                let randomIndex = Math.floor(Math.random()*bucket.length);
                return bucket.splice(randomIndex, 1)[0];
            }

            function renderSingleCard(inspo) {
                // console.log(inspo);
    
                inspoCard = document.createElement("div")
                inspoCard.className = "card";
                // console.log(inspoCard);
    
                inspoAuthorTag = document.createElement("h3")
                authorName = document.createTextNode(inspo.author)
                inspoAuthorTag.appendChild(authorName)
                inspoCard.append(inspoAuthorTag)
    
                inspoImgTag = document.createElement("img")
                inspoImgTag.src = inspo.image
                inspoImgTag.className = "inspo-avatar"
                inspoCard.append(inspoImgTag)
    
                inspoQuoteTag = document.createElement("h4")
                inspoQuote = document.createTextNode(inspo.quote)
                inspoQuoteTag.appendChild(inspoQuote)
                inspoCard.append(inspoQuoteTag)
    
                inspoLikesTag = document.createElement("p")
                inspoLikesTag.className = "inspo-likes"
                inspoLikesTag.innerText = `${inspo.likes} Likes`
                inspoCard.append(inspoLikesTag)
    
                likesBttnTag = document.createElement("div")
                likesBttnTag.className = "like-btn"
                likesBttn = document.createTextNode("ॐ")
                likesBttnTag.appendChild(likesBttn)
                inspoCard.append(likesBttnTag)
                
    
    
                inspoCollection.append(inspoCard);
                // console.log(inspoCollection);
            }
            renderSingleCard(inspo[getRandomFromBucket()])
            renderSingleCard(inspo[getRandomFromBucket()])
            renderSingleCard(inspo[getRandomFromBucket()])
        }
      });
});

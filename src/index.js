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
    
                const inspoCard = document.createElement("div")
                inspoCard.className = "card";
                // console.log(inspoCard);
    
                const inspoAuthorTag = document.createElement("h3")
                authorName = document.createTextNode(inspo.author)
                inspoAuthorTag.appendChild(authorName)
                inspoCard.append(inspoAuthorTag)
    
                const inspoImgTag = document.createElement("img")
                inspoImgTag.src = inspo.image
                inspoImgTag.className = "inspo-avatar"
                inspoCard.append(inspoImgTag)
    
                const inspoQuoteTag = document.createElement("h4")
                inspoQuote = document.createTextNode(inspo.quote)
                inspoQuoteTag.appendChild(inspoQuote)
                inspoCard.append(inspoQuoteTag)
    
                const inspoLikesCount = document.createElement("p")
                inspoLikesCount.className = "inspo-likes"
                inspoLikesCount.innerText = `${inspo.likes} Likes`
                inspoCard.append(inspoLikesCount)
    
                const likesBttnTag = document.createElement("div")
                likesBttnTag.className = "like-btn"
                const likesBttn = document.createTextNode("💭")
                likesBttnTag.appendChild(likesBttn)
                inspoCard.append(likesBttnTag)
                likesBttn.addEventListener("click", addLikes)
                function addLikes(){
                    inspoLikesCount.innerText = ++inspo.likes;
                 }
    
    
                inspoCollection.append(inspoCard);
                // console.log(inspoCollection);
            }
            renderSingleCard(inspo[getRandomFromBucket()])
            renderSingleCard(inspo[getRandomFromBucket()])
            renderSingleCard(inspo[getRandomFromBucket()])
        }
      });

});

const url = "http://localhost:3000/inspo";


const inspoFormContainer = document.querySelector(".container");
const getInspoBttn = document.querySelector("#get-inspo-btn");
const createInspoBttn = document.getElementsByClassName("add-inspo-form")[0];
const dropDownMenu = document.getElementById("authors-menu");
let loaded = false;
let addInspo = false;

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
                likesBttnTag.addEventListener("click", addLikes)
                function addLikes(){
                    inspoLikesCount.innerText = `${++inspo.likes} Likes`;
                 }
    
    
                inspoCollection.append(inspoCard);
                // console.log(inspoCollection);
            }
            renderSingleCard(inspo[getRandomFromBucket()])
            renderSingleCard(inspo[getRandomFromBucket()])
            renderSingleCard(inspo[getRandomFromBucket()])

        };

        function handleCreateInspo(event){
            event.preventDefault();
            // console.log("HELLO");
            // Stores the value of "enter a inspo's name"
            createAuthorNameInput = document.getElementsByName("name")
            let authorNameInput = createAuthorNameInput[0].value

            // Stores the value of "enter a inspo's quote..."
            createInspoQuote = document.getElementsByName("quote")
            let inspoQuote = createInspoQuote[0].value
            
            // Stores the value of "enter a inspo's image URL..."
            createInspoImg = document.getElementsByName("image")
            let newInspoImg = createInspoImg[0].value

            
            const submitBttn = document.getElementById("submit")
            submitBttn.addEventListener("click", addInspoToList)
            function addInspoToList(){
                event.preventDefault()
                inspoCollection.append(event)
                event.reset()
            }
            
            // allows you to throw the information from the three inputs back into the database / .json
            let fetchObject = {
              method: 'POST',
              headers: 
              {
                "Content-Type": "application/json",
                'Accept': "application/json"
              },
          
              body: JSON.stringify({
                "name": authorNameInput,
                "quote": inspoQuote,
                "image": newInspoImg,
                "likes": 0
              })
            }
            
            // CREATING A INSPO CARDS
            // We are creating fetchObject to send to the server 
            fetch('http://localhost:3000/inspo', fetchObject)
        };

        // ADDING AUTHORS TO DROP DOWN MENU ---------------------------------------------------------->
        function dropDownMenuFunc(inspo){
            inspo.forEach(obj => {
                const option = document.createElement("option")
                option.textContent = obj.author
                dropDownMenu.append(option)
                // console.log(option);
            });
        };

        fetch(url)
            .then(response => response.json())
            .then(dropDownMenuFunc)


        // const authorNameSelect = document.getElementById("authors-menu")
        // const singleAuthor = authorNameSelect.children
        // singleAuthor.addEventListener("click", renderSingleCard(authorNameSelect))


        function renderNewInspoCard(inspo){
            const newInspoCard = document.createElement("div")
            newInspoCard.className = "card";

            const newInspoAuthorTag = document.createElement("h3")
            newAuthorName = document.createTextNode(authorNameInput.value)
            newInspoAuthorTag.appendChild(newAuthorName)
            newInspoCard.append(newInspoAuthorTag)

            const newInspoImgTag = document.createElement("img")
            newInspoImgTag.src = newInspoImg.value
            newInspoImgTag.className = "inspo-avatar"
            newInspoCard.append(newInspoImgTag)

            const newInspoLikesCount = document.createElement("p")
            newInspoLikesCount.className = "inspo-likes"
            newInspoLikesCount.innerText = `${inspo.likes} Likes`
            newInspoCard.append(newInspoLikesCount)

            const newInpoLikesBttnTag = document.createElement("div")
            newInpoLikesBttnTag.className = "like-btn"
            const newInspoLikesBttn = document.createTextNode("💭")
            newInpoLikesBttnTag.appendChild(newInspoLikesBttn)
            newInspoCard.append(newInpoLikesBttnTag)
            newInspoLikesBttn.addEventListener("click", addLikes)

            function addLikes(){
                inspoLikesCount.innerText = ++inspo.likes;
                }
    
            
            inspoCollection.append(newInspoCard);
            // console.log(inspoCollection);
        }


        // MUSIC PLAYER ----------------------------------------------------------------------------->
        const musicContainer = document.getElementById('music-container');
        const playBtn = document.getElementById('play');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        const audio = document.getElementById('audio');
        const progress = document.getElementById('progress');
        const progressContainer = document.getElementById('progress-container');
        const title = document.getElementById('title');
        const cover = document.getElementById('cover');
        const currTime = document.querySelector('#currTime');
        const durTime = document.querySelector('#durTime');

        // Song titles
        const songs = ['Perfect Circle', 'Stars', 'Aruarian'];

        // Keep track of song
        let songIndex = 2;

        // Initially load song details into DOM
        loadSong(songs[songIndex]);

        // Update song details
        function loadSong(song) {
        title.innerText = song;
        audio.src = `music/${song}.mp3`;
        cover.src = `images/${song}.jpg`;
        }

        // Play song
        function playSong() {
        musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        audio.play();
        }

        // Pause song
        function pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.add('fa-play');
        playBtn.querySelector('i.fas').classList.remove('fa-pause');

        audio.pause();
        }

        // Previous song
        function prevSong() {
        songIndex--;

        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        loadSong(songs[songIndex]);

        playSong();
        }

        // Next song
        function nextSong() {
        songIndex++;

        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        loadSong(songs[songIndex]);

        playSong();
        }

        // Update progress bar
        function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        }

        // Set progress bar
        function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
        }

        //get duration & currentTime for Time of song
        function DurTime (e) {
            const {duration,currentTime} = e.srcElement;
            var sec;
            var sec_d;

            // define minutes currentTime
            let min = (currentTime==null)? 0:
            Math.floor(currentTime/60);
            min = min <10 ? '0'+min:min;

            // define seconds currentTime
            function get_sec (x) {
                if(Math.floor(x) >= 60){
                    
                    for (var i = 1; i<=60; i++){
                        if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                            sec = Math.floor(x) - (60*i);
                            sec = sec <10 ? '0'+sec:sec;
                        }
                    }
                }else{
                    sec = Math.floor(x);
                    sec = sec <10 ? '0'+sec:sec;
                }
            } 

            get_sec (currentTime,sec);

            // change currentTime DOM
            currTime.innerHTML = min +':'+ sec;

            // define minutes duration
            let min_d = (isNaN(duration) === true)? '0':
                Math.floor(duration/60);
            min_d = min_d <10 ? '0'+min_d:min_d;


            function get_sec_d (x) {
                if(Math.floor(x) >= 60){
                    
                    for (var i = 1; i<=60; i++){
                        if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                            sec_d = Math.floor(x) - (60*i);
                            sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                        }
                    }
                }else{
                    sec_d = (isNaN(duration) === true)? '0':
                    Math.floor(x);
                    sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                }
            } 

            // define seconds duration
            
            get_sec_d (duration);

            // change duration DOM
            durTime.innerHTML = min_d +':'+ sec_d;
                
        };

        // Event listeners
        playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');

        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
        });

        // Change song
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);

        // Time/song update
        audio.addEventListener('timeupdate', updateProgress);

        // Click on progress bar
        progressContainer.addEventListener('click', setProgress);

        // Song ends
        audio.addEventListener('ended', nextSong);

        // Time of song
        audio.addEventListener('timeupdate',DurTime);




      });

});



const githubURL = "https://api.github.com/users/josepplloo/repos";

fetch(githubURL)
.then(response => {
  return response.json();
})
.then(response => {
    const repoData = response.map(item => {
        return {id, name, description, language, html_url} = item;
    });
 
    return repoData;
}).then((value) => {
    //feedind the workList unorderer list

    const workList = document.getElementById("work-list");

    const languagesList = [... new Set(value
        .map( ({language}) => language)
        .filter(language => language )
    )];

    const languagesDOM = languagesList.map(language => {
       return (`
            <li id="${language}" class="work-item">${language}</li>
        `);
    }).join('').concat(`<li id="All"  class="work-item work-item-selected">All</li>`);

    workList.innerHTML = languagesDOM;

    /*
    Get the node for painting the container whit all my
    github project.
    */

    const workContent = document.querySelector('.works-content');

    function paintModalElements (repo) {
        const template = `
            <div>
                <span class="modal_close">Not now.</span>
                <a href="${repo.html_url}" target="_blank" class="modal_a">Visit Repo!</a>
            </div>
        `
        const parser = new DOMParser();
        const templateParsed = parser.parseFromString(template, "text/html")
        .body.children[0];
        return templateParsed;
    }

    // use this Function makes the modal for all cards
    function quitModal (){
        const repoCards = workContent.querySelectorAll('.works__card');
        repoCards.forEach(
            card => {
                card.classList.remove('modal');
                
            }
        );
    }


    function cardEvents(card) {
        
        card.addEventListener('click',function (event) {
            const clickedElement = event.target;

            if (clickedElement === card ||
                 clickedElement === card.firstChild ||
                 clickedElement === card.children[1] ||
                 clickedElement === card.children[2] ){
                quitModal();
                card.classList.add('modal');
                card.style.backgroundColor = "white"                
            }
            if (clickedElement === card.querySelector('.modal_close')) {
                quitModal();
            } 
            
        });
        document.addEventListener('click',function(){
            quitModal();
        });
        card.addEventListener('click',function(event){
            event.stopPropagation();
        });
        
        // When the user clicks anywhere outside of the modal, close it   
    }


    function paintRepos(repos) { 

        repos.forEach(repo => {  
            let card = document.createElement("div");
            
            let cardColor  = ""+repo.id.toString().substr(0, 6)+"11"
            card.style.backgroundColor = `#${cardColor}`;

            let cardDescription = document.createElement("h5");
            let cardLanguage = document.createElement("h4");
            let cardName = document.createElement("h4");

            cardDescription.appendChild(document.createTextNode(repo.description));
            cardLanguage.appendChild(document.createTextNode(repo.language));
            cardName.appendChild(document.createTextNode(repo.name));
            card.appendChild(cardDescription);
            card.appendChild(cardName);
            card.appendChild(cardLanguage);
            card.classList.add("works__card");

            const modalElements = paintModalElements(repo)
            card.appendChild(modalElements.querySelector('.modal_a'));
            card.appendChild(modalElements.querySelector('.modal_close'));

            workContent.appendChild(card);

            cardEvents(card);            


        });

    }

    paintRepos(value);

    //Fill the works if clicked
    workList.addEventListener('click',
    function (event) {
        
        const clickedElement = event.target;

        const itemsList = workList.querySelectorAll('.work-item');
        workList.classList.remove('work-item-selected');
        itemsList.forEach(element => {
            element.classList.remove('work-item-selected');
        });


        if ( event.target.nodeName == "LI") {
            clickedElement.classList.add('work-item-selected');
            //Filter by programing language
            let filteredWork = value.filter(x => x.language == event.target.id);
            while (workContent.firstChild){
                workContent.removeChild(workContent.firstChild);
            }

            if (event.target.id == "All"){
                filteredWork= value;
            }

            paintRepos(filteredWork);
            
        }
    });
    


});




const about = document.getElementById("about");
const getAbout = document.getElementById("getAbout");
const resume = document.getElementById("resume");
const getResume = document.getElementById("getResume");
const works = document.getElementById("works");
const getWorks = document.getElementById("getWorks");
const contact = document.getElementById("contact");
const getContact = document.getElementById("getContact");


function remove() {
    about.classList.remove('view');
    getAbout.classList.remove('selected');
    resume.classList.remove('view');
    getResume.classList.remove('selected');
    works.classList.remove('view');
    getWorks.classList.remove('selected');
    contact.classList.remove('view');
    getContact.classList.remove('selected');
}



getAbout.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove('about');
        about.classList.add('view');
        getAbout.classList.add('selected');
    }
});

getResume.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        resume.classList.add('view');
        getResume.classList.add('selected');
    }
})
getWorks.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        works.classList.add('view');
        getWorks.classList.add('selected');
    }
})



getContact.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        contact.classList.add('view');
        getContact.classList.add('selected');
    }

})

const fullname = document.getElementById('fullname');
const email = document.getElementById("email");
const userMessage = document.getElementById("message");
const form = document.getElementById("form");

if( !(localStorage.getItem('userEmail') == null )){
    console.log("Hello ", localStorage.getItem('userEmail'));
    email.value=localStorage.getItem('userEmail');
}

if( !(localStorage.getItem('userName') == null )){
    fullname.value=localStorage.getItem('userName');
}

if( !(localStorage.getItem('userMessage') == null )){
    userMessage.value=localStorage.getItem('userMessage');
}


fullname.addEventListener('input',function(event){
    localStorage.setItem('userName', fullname.value);
});

email.addEventListener('input',function(event){
    localStorage.setItem('userEmail', email.value);
});

userMessage.addEventListener('input',function(event){
    localStorage.setItem('userMessage', userMessage.value);
});

email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I expect an e-mail, darling!");
    } else {
        email.setCustomValidity("");
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.clear();
});

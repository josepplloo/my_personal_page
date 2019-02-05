const githubURL = "https://api.github.com/users/josepplloo/repos";

fetch(githubURL)
.then(response => {
  return response.json();
})
.then(response => {
    const repoData = response.map(item => {
        return {id, name, description, language} = item;
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

    const workContent = document.getElementsByClassName('works-content');
    

    function paintRepos(repos) { 
        repos.map(repo =>{    
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

            workContent[0].appendChild(card);

            let closeElement = `<span class="modal_close">&times;</span>`;
            let template = document.createElement('template');
            template.innerHTML = closeElement.trim();
            // use this funtion for the modal too

            //Try to do a modal for all cards
            const repoCards = workContent[0].querySelectorAll('.works__card');
            console.log(repoCards);

            function quitModal(){
                repoCards.forEach(
                    card => {
                        card.classList.remove('modal');
                    }
                );
            }

            repoCards.forEach(
                card => {
                    card.addEventListener('click',function (event) {
                        const clickedElement = event.target;
                        if (clickedElement==card) {
                            quitModal();
                            card.classList.add('modal');
                        }
                        
                    });
                    card.addEventListener('click',function(event){
                        event.stopPropagation();
                    });
                    document.addEventListener('click',function(event){
                        quitModal();
                    });
                    // When the user clicks anywhere outside of the modal, close it
                }
            );

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

        clickedElement.classList.add('work-item-selected');

        if ( event.target.nodeName == "LI") {

            console.log("List item ", value.filter(x => x.language == event.target.id));
            console.log("List item ", event.target.id.replace("post-", ""), " was clicked!");
            
            
            //Filter by programing language
            let filteredWork = value.filter(x => x.language == event.target.id);
            while (workContent[0].firstChild){
                workContent[0].removeChild(workContent[0].firstChild);
            }

            if (event.target.id == "All"){
                filteredWork= value;
            }

            paintRepos(filteredWork);
            
        }
    });
    


});




let about = document.getElementById("about");
let getAbout = document.getElementById("getAbout");
let resume = document.getElementById("resume");
let getResume = document.getElementById("getResume");
let works = document.getElementById("works");
let getWorks = document.getElementById("getWorks");
//let blog = document.getElementById("blog");
//let getBlog = document.getElementById("getBlog");
let contact = document.getElementById("contact");
let getContact = document.getElementById("getContact");

//console.log(getResume)

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


/*
getBlog.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        blog.classList.add('view');
        getBlog.classList.add('selected');
    }
})
*/

getContact.addEventListener('click', function (e) {
    if (window.innerWidth > 1040) {
        e.preventDefault();
        remove();
        contact.classList.add('view');
        getContact.classList.add('selected');
    }

})

var email = document.getElementById("email");
var form = document.getElementById("form");

email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I expect an e-mail, darling!");
    } else {
        email.setCustomValidity("");
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
});

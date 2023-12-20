const main = document.getElementById("main");
const nav = {
    home: document.getElementById("home"),
    agregar: document.getElementById("agregar")
};

function refreshHTML() {
    let curretPageName = window.location.hash.replace("#", "");

    if (!curretPageName) {
        curretPageName = "home";
    }

    getContentHTML(curretPageName);
}

window.onload = () => {

    refreshHTML();

};


const links = [nav.home, nav.agregar];
for (let i = 0; i < links.length; i++) {
    const link = links[i];

    link.addEventListener('click', (e) => {
        getContentHTML(e.target.id);
    });
}


function getContentHTML(pageName) {
    if (!pageName) {
        pageName = "home";
    }

    const filepath = "./" + pageName + ".html";
    const xhr = new XMLHttpRequest();

    xhr.open("get", filepath);

    xhr.onload = () => {
        if (xhr.status === 200) {
            setActiveLink(links, nav[pageName]);
            main.innerHTML = xhr.response;

            if (pageName === "home") {
                showMovies(movies);
            }

            if (pageName === "agregar") {
                setupAgregarPage();
            }
        }

    };

    xhr.send();
}


function setActiveLink(links, linkActive) {
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        link.className = "";
    }

    linkActive.className = "link-active";
}


const btnBack = document.getElementById("back");
const btnForward = document.getElementById("forward");

btnBack.addEventListener('click', () => {
    history.back();
});

btnForward.addEventListener('click', () => {
    history.forward();
});


window.onhashchange = (e) => {
    let pageName = e.currentTarget.location.hash.replace("#", "");
    getContentHTML(pageName);
};


let movies = [
    { title: 'El señor de los anillos', description: 'Director: Peter Jackson / Reparto: Elijah Wood, Viggo Mortensen, Orlando Bloom, Sean Astin, Ian McKellen / Duración: 178 min.', year: 2001 },
    { title: 'Pulp Fiction', description: 'Director: Quentin Tarantino / Reparto: Samuel L. Jackson, Bruce Willis, Uma Thurman, Christopher Walken, John Travolta, Harvey Keitel, Tim Roth, Amanda Plummer / Duración: 154 min.', year: 2000 },
    { title: 'El Caballero Oscuro. La Leyenda Renace', description: 'Director: Christopher Nolan / Reparto: Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine, Gary Oldman / Duración: 152 min.', year: 2005 },
    { title: 'Batman. El Caballero Oscuro', description: 'Director: Christopher Nolan / Reparto: Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine, Gary Oldman / Duración: 152 min.', year: 2008 },
    { title: 'Harry Potter', description: 'Director: Chris Columbus / Reparto: Daniel Radcliffe, Rupert Grint, Emma Watson, Robbie Coltrane, Ralph Fiennes / Duración: 160 min.', year: 2001 },
    { title: 'Avatar', description: 'Director:  James Cameron / Reparto: Sam Worthington, Zoe Saldaña, Sigourney Weaver, Stephen Lang, Michelle Rodriguez. / Duración: 162 min.', year: 2009 },
    { title: 'Titanic', description: 'Director:  James Cameron / Reparto: Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates, Gloria Stuart, Bill Paxton / Duración: 195 min.', year: 1997 },
    { title: 'IT', description: 'Director: Andrés Muschietti / Reparto: Jack Dylan Grazer, Nicholas Hamilton y Jackson Robert Scott  / Duración: 162 min.', year: 2017 },
];

function showMovies(movieArray) {
    const movieList = document.getElementById('array');
    movieList.innerHTML = '';

    if (movieArray.length === 0) {
        movieList.innerHTML = '<p>No se encontraron películas.</p>';
    } else {
        movieArray.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.innerHTML = `<h3>${movie.title}</h3>
                            <p>${movie.description}</p>
                            <p>Año: ${movie.year}</p>`;
            movieList.appendChild(movieDiv);
            movieDiv.classList.add('movie');
        });
    }
}

window.addEventListener('load', () => {
    refreshHTML();
    showMovies(movies);
});

nav.agregar.addEventListener('click', (e) => {
    getContentHTML('agregar');
});

const searchInput = document.getElementById('searchbar');

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchValue)
    );
    showMovies(filteredMovies);
});


const yearFilter = document.getElementById('yearFilter');

yearFilter.addEventListener('change', () => {
    const selectedYear = parseInt(yearFilter.value);
    const filteredByYear = movies.filter(movie => movie.year === selectedYear);
    showMovies(filteredByYear);
});

document.addEventListener('click', function (event) {

    const filterDropdown = document.getElementById('filter');

    if (event.target !== yearFilter && event.target.parentNode !== filterDropdown) {
        yearFilter.selectedIndex = 0;
        const allMovies = [...movies];
        showMovies(allMovies);
    }
});

function isValidYear(yearString) {
    const yearRegex = /^(19|20)\d{2}$/;
    return yearRegex.test(yearString);
}

function setupAgregarPage() {
    const addMovieForm = document.getElementById('addMovieForm');
    addMovieForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('titleInput').value;
        const description = document.getElementById('id-observations').value;
        const yearInput = document.getElementById('yearInput').value;


        if (title && description && yearInput && isValidYear(yearInput)) {

            const year = parseInt(yearInput);
            const newMovie = {
                title: title,
                description: description,
                year: year

            };

            movies.push(newMovie);

            addMovieForm.reset();

            alert("Se ha agregado la película correctamente");
            setTimeout(function () {
                window.location.href = '#home';
                getContentHTML('home');
            }, 1000);

        } else {
            alert('Por favor, completa todos los campos. (Validar que se ingrese un año entre 1900 y 2100)');
        }
    });
}
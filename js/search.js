function search_animal() {
	let input = document.getElementById('searchbar').value;
	input = input.toLowerCase();
	let x = document.getElementsByClassName('animals');
	
	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display = "none";
		}
		else {
			x[i].style.display = "block";
		}
	}
}

const searchVinos = () => {
    let x = document.getElementsByClassName('animals');
    for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes("vino")) {
			x[i].style.display = "none";
		}
		else {
			x[i].style.display = "block";
		}
	}
};
const searchLicores = () => {
    let x = document.getElementsByClassName('animals');
    for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes("licor")) {
			x[i].style.display = "none";
		}
		else {
			x[i].style.display = "block";
		}
	}
};
const searchWhisky = () => {
    let x = document.getElementsByClassName('animals');
    for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes("whisky")) {
			x[i].style.display = "none";
		}
		else {
			x[i].style.display = "block";
		}
	}
};
const searchGinebras = () => {
    let x = document.getElementsByClassName('animals');
    for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes("ginebra")) {
			x[i].style.display = "none";
		}
		else {
			x[i].style.display = "block";
		}
	}
};
const searchTequilas = () => {
    let x = document.getElementsByClassName('animals');
    for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes("tequila")) {
			x[i].style.display = "none";
		}
		else {
			x[i].style.display = "block";
		}
	}
};
const searchAll = () => {
    let x = document.getElementsByClassName('animals');
    for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes("")) {
			x[i].style.display = "none";
		}
		else {
			x[i].style.display = "block";
		}
	}
};
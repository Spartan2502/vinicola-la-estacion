let users = [];

const redirect = () => {
    location.href ="../registro.html";
}

const registrarse = () => {
    let email =  document.getElementById("email").value;
    let password =  document.getElementById("password").value;
    let name =  document.getElementById("name").value;
    let lastName =  document.getElementById("lastName").value;
    let tel =  document.getElementById("tel").value;
    
    let objetoLS = {
        email,
        password: btoa(password),
        name,
        lastName,
        tel
    }

    let pass2 = document.getElementById("password2").value;
    let parsedUsers = JSON.parse(localStorage.getItem("usuarios"));

    if (parsedUsers.some(element => element.email === email)) {
        alert("Ya existe un usuario con ese correo");
    } else if (password === pass2  && document.getElementById("radio").checked == true) {
        parsedUsers.push(objetoLS);
        localStorage.setItem("usuarios", JSON.stringify(parsedUsers));
       // document.getElementById("form").reset();
       location.href="../login.html"
        alert("Registro exitoso");
    } else if (document.getElementById("radio").checked == false) {
        alert("Debes aceptar los términos");
    } else {
        alert("Las contraseñas no coinciden");
    }
}
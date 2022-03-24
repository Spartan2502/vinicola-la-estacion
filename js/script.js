let administrador = {
    email: "admin@correo.com",
    password: btoa("admin123"),
    name: "Daniel",
    lastName: "Gomez",
    phone: 4656384488
};
let email = document.querySelector("#inputEmail");
let password = document.querySelector("#inputPassword");

const validarUsuario = () => {
    if (!localStorage.getItem("usuarios")) {
        console.log("Sin valores previos en primera carga, agregando admin...");
        localStorage.setItem("usuarios", `[${JSON.stringify(administrador)}]`);
    }
}
window.addEventListener('DOMContentLoaded', validarUsuario());

const login = () => {
    let parsedUsers = JSON.parse(localStorage.getItem("usuarios"));

    if(email.value==="admin@correo.com" && password.value === "admin123"){
        location.href = "../panel.html";
    }
    else{
        if (parsedUsers.some(x => x.email === email.value)) {
            let found = parsedUsers.filter(x => x.email === email.value);
            if (password.value === atob(found[0].password)) {

                sessionStorage.setItem("logged", JSON.stringify(email.value));
                location.href = "../products.html";
                alert("Acceso correcto");
                
                

            } else {
                alert("Contraseña incorrecta"); 
                password.value = "";
            }
        } else {
            alert("El correo no existe en el sistema");
        }
    }
}
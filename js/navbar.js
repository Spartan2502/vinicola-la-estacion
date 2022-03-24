function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
 
var name1=document.getElementById('nombre');
var emailU=document.getElementById('correo');
var topic=document.getElementById('asunto');
var message=document.getElementById('mensaje');
var mensajes=[];

function sendMessage(){

  mensajes=JSON.parse(localStorage.getItem('mensajes'));
  if(mensajes==null){
    mensajes=[];
  }

  if(name1.value==""){return}
  if(emailU.value==""){return}
  if(topic.value==""){return}
  if(message.value==""){return}
 
  var objeto={
    nombre: name1.value,
    correo: emailU.value,
    asunto: topic.value,
    Mensaje: message.value
  }

  mensajes.push(objeto);
  localStorage.setItem('mensajes', JSON.stringify(mensajes))
  alert('Se envío tu mensaje')
  name1.value="";
  emailU.value="";
  topic.value="";
  message.value="";

}
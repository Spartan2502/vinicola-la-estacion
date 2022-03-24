Mayor=document.querySelector('#mayor');
Menor=document.querySelector('#menor');
Texto=document.getElementById('card-text');

function entrar(){
if(Menor.checked==true && Mayor.checked==false){
Texto.innerHTML=`  <div id="correccion">
<p>Marca la opcion para confirmar tu edad antes de continuar</p>
</div>`
return
}
if(Mayor.checked==true && Menor.checked==false){
    location.replace('index.html')
    }
    if(Mayor.checked==true && Menor.checked==true){
        location.replace('index.html')
        }
}
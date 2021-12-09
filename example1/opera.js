
const db = firebase.firestore();
const tasksContainer = document.getElementById('tasks-container');
const Servicios = document.getElementById('Servicios');
const project = document.getElementById('project');
const btn = document.getElementById('task-form');
const btnCliente = document.getElementById('btn-task-form');
const btnPro = document.getElementById('btn-task-form2');
const superior = document.getElementById('task-Superior');
var Ninos = 0;
var Adultos = 0;
var Precio = 0;
var IVA = 0;
contador = 1;
precio = 0;
var exite = 1;
var ProveedoresArray = [];

function APDF(){
   // html2pdd(document.getElementById('Fact'));
}


function ExisteEnArray(Prov){
    var flag = false;
    ProveedoresArray.forEach(element=>{
        if(Prov == element){
            flag = true;
        }
    })

    if(flag == false){
        ProveedoresArray.push(Prov);
           document.getElementById('prover').innerHTML+=`<option value="${Prov}">${Prov}</option>`;
    }
}

function BuscarProovedor(){
    Servicios.innerHTML = ``;
    document.getElementById('task-form').style.display = 'none';
    const onGetTask = (callback) => db.collection( " Tours/collection/"+document.getElementById('task-id').value).onSnapshot(callback); //En vivo
    onGetTask((querySnapshot) =>{
    querySnapshot.forEach(doc => {
        if(doc.data().Proveedor == document.getElementById('prover').value){
             Servicios.innerHTML += ` <td class="service">${doc.data().ID}</td>
            <td class="desc">${doc.data().Description}</td>
            <td class="unit">${doc.data().Time}</td>
            <td class="qty">${doc.data().PlaceIn} </td>
            <td class="total">${doc.data().PlaceOut}</td>
            <td class="total">${doc.data().In} <br> ${doc.data().Out}</td><br><br>`;
        }
   
    })
          
  })

}




function restaFechas(f1,f2)
 {
  
var fechaInicio = new Date(f1).getTime();
var fechaFin    = new Date(f2).getTime();
var diff = fechaFin - fechaInicio;
var DifeD = (diff/(1000*60*60*24));
if(DifeD == 0){
    return 1;
}else{
    return(DifeD );
}


 }
btnCliente.addEventListener('click', (e)=>{
    console.log("Click en cliente");
    e.preventDefault();
    if(!document.getElementById('task-id').value){
        alert("Texto vacio");}else{
            superior.innerHTML=`<th class="service">ID</th>
            <th class="desc">Detalles</th>
            <th>Time</th>
            <th>PlaceIn</th>
            <th>PlaceOut</th>
            <th>In/Out</th>
            <th>Price</th>`;
             const ID = document.getElementById('task-id').value;
  const onGetTask = (callback) => db.collection(" Tours/collection/"+ID).onSnapshot(callback); //En vivo
   const onGetTask2 = (callback) => db.collection("Clientes").onSnapshot(callback); //En vivo
   
    project.innerHTML =``;
    onGetTask2 ((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
             console.log(doc.data().Tours)
        if(doc.data().Tours == ID){
            project.innerHTML = `<div><span>Servicio</span> Tours and shuttles</div>
            <div><span>CLIENT</span> ${doc.data().Name}</div>
            <div><span>Niños</span> ${doc.data().Nino}</div>
            <div><span>Adultos</span> ${doc.data().Adulto}</div>`;
            if(doc.data().estado == true){
                 project.innerHTML += `<div><span>Estado</span>Aceptado</div>`;
            }else{
                 project.innerHTML += `<div><span>Estado</span>Cancelado</div>`;
            }
            project.innerHTML += `<div><span>ID</span>${document.getElementById('task-id').value}</div>`;
            Adulto = doc.data().Adulto;
            Ninos = doc.data().Nino;
            IVA = doc.data().iva;
            exite =0;
        }


        })
       
    })
    var a = setInterval(function(){  if(exite == 1){
        alert("No existe el ID ingresado");
    }
        else{
            btn.style.display = "none";
            onGetTask((querySnapshot) =>{
    querySnapshot.forEach(doc => {
    console.log(doc.data())
    
      Servicios.innerHTML += ` <td class="service">${doc.data().ID}</td>
            <td class="desc">${doc.data().Description}</td>
            <td class="unit">${doc.data().Time}</td>
            <td class="qty">${doc.data().PlaceIn} </td>
            <td class="total">${doc.data().PlaceOut}</td>
            <td class="total">${doc.data().In} <br> ${doc.data().Out}</td>
            <td class="total">$${doc.data().Price}</td>
          </tr>`;
          
        Precio += (((doc.data().Price) * Ninos) + ((doc.data().Price) * Adulto))*restaFechas(doc.data().In,doc.data().Out );

        
  })
    Servicios.innerHTML+=`  
            <tr>
            <td colspan="7" class="grand total"></td>

          </tr>

         <tr>
            <td colspan="6">SUBTOTAL</td>
            <td class="total">$${Precio}</td>
          </tr>
          <tr>
            <td colspan="6">TAX ${IVA}%</td>
            <td class="total">$${Math.round(  Precio*(IVA))/100  }</td>
          </tr>
          <tr>
            <td colspan="6" class="grand total">GRAND TOTAL</td>
            <td class="grand total">$${Precio*(IVA/100)+Precio}</td>
          </tr>`
          Precio = 0;
        })
    } clearInterval(a);}, 900);
   
        
 }
    
})


btnPro.addEventListener('click', (e)=>{
    if(!document.getElementById('task-id').value){
         alert("Texto vacio");
    }else{
        console.log("Click en Provedor");
    e.preventDefault();
    superior.innerHTML=`<th class="service">ID</th>
            <th class="desc">Detalles</th>
            <th>Time</th>
            <th>PlaceIn</th>
            <th>PlaceOut</th>
            <th>In/Out</th>`;
    const ID = document.getElementById('task-id').value;//tomo el id 
  const onGetTask = (callback) => db.collection(" Tours/collection/"+ID).onSnapshot(callback); //En vivo
   const onGetTask2 = (callback) => db.collection("Clientes").onSnapshot(callback); //En vivo
Servicios.innerHTML =``;
project.innerHTML = ``;
    onGetTask2 ((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
             console.log(doc.data().Tours)
        if(doc.data().Tours == ID){
            project.innerHTML = `<div><span>Servicio</span> Tours and shuttles</div>
            <div><span>CLIENT</span> ${doc.data().Name}</div>
            <div><span>Niños</span> ${doc.data().Nino}</div>
            <div><span>Adultos</span> ${doc.data().Adulto}</div>`;
            Adulto = doc.data().Adulto;
            Ninos = doc.data().Nino;
            exite = 0;
           
        }


        })
       
    })
    var a = setInterval(function(){ if(exite == 1){
        alert("No existe el ID ingresado");
        existe = 0;
    }else{
        document.getElementById('ListaProvedores').style.display = 'block';
        
        onGetTask((querySnapshot) =>{
    querySnapshot.forEach(doc => {
    console.log(doc.data())    
          ExisteEnArray(doc.data().Proveedor);
    })
          
  })
    } clearInterval(a);}, 900);

    
    }
  
})

window.addEventListener('DOMContentLoaded',(e)=>{
    document.getElementById('ListaProvedores').style.display = 'none';
})










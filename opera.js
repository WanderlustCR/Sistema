const db = firebase.firestore();
const tasksContainer = document.getElementById('tasks-container');
const taskForm = document.getElementById('task-form');
const refre = document.getElementById('refre');
const Cliente = document.getElementById('Cliente');
const tr = document.getElementById('tour');
const alerta = document.getElementById('Alerta');
const ele = document.getElementById('Vol');
var enviado = "false";
var servicios= [];  
var provedorArray=[];
var dias = 0;
var IDQuery = "";
const onGetTask2 = (callback) => db.collection("Clientes").onSnapshot(callback);

function Rellena(){
  setTimeout(provedorArray.forEach(element=>{
    if(element){
      document.getElementById('task-Proveedor').innerHTML+=`<option value="${element}">${element}</option>`
    }
    
  }),2000);
  

}

function Atras(){
  document.getElementById("Clase1").style.display = "block";
   document.getElementById("ifra").innerHTML=``;
}
function Mostrar(){
  document.getElementById("Clase1").style.display = "none";
  document.getElementById("ifra").innerHTML=`<div><button onclick="Atras()" id="ver"><--</button></div><iframe src="example1/index.html" width="100%" "></iframe>`
}

function Ingresa(){
  var IDQuery = prompt("Igrese el Valor del ID a buscar",0);
    onGetTask2 ((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
             console.log(doc.data().Tours)
        if(doc.data().Tours == IDQuery){
          alerta.style.display = 'block';
          enviado = "true";
          tr.style.display = 'block';
          Cliente.style.display = 'none';
          ND = IDQuery;
        }
      })
       
    })
}
function Volver(){
  tr.style.display = "none";
  Cliente.style.display = "block";
  enviado = "false";
}

function informacion(Concierge,Agent,In,Out,Name,Tours, Nino, Adulto,IVA){
    this.Concierge = Concierge;
    this.Agent = Agent;
    this.In = In;
    this.Out = Out ;
    this.Name = Name;
    this.Tours = Tours;
    this.Nino = Nino;
    this.Adulto = Adulto;
    this.IVA = IVA;
};

function Tour(ID,Name,Description,In,Out,PlaceIn,PlaceOut,Price,Time){
  this.ID = ID;
  this.Name = Name;
  this.Description = Description;
  this.In = In;
  this.Out = Out;
  this.PlaceIn = PlaceIn;
  this.PlaceOut = PlaceOut;
  this.Price = Price;
  this.Time = Time;
  
};





const saveArray = (ar)=>
  db.collection('Clientes').doc().set({
    
  });

const saveTours = (ID,Name,Description,In,Out,PlaceIn,PlaceOut,Price,PriceProve,Time,Proveedor)=>db.collection(" Tours/collection/"+ND).add({
  ID,
  Name,
  Description,
  In,
  Out,
  PlaceIn,
  PlaceOut,
  Price,
  PriceProve,
  Time,
  Proveedor
})
function fechaHoy(){
  const fecha =  new Date();
  const dia = fecha.getDate();
  const anio = fecha.getFullYear();
  const mes  = fecha.getMonth()+1;

  return anio + "-" + mes +"-"+ dia;
}
const estado = true;

const saveTask = (Concierge,Agent,In,Out,Name,Tours,Nino, Adulto, iva)=>
  db.collection('Clientes').add({
    FechaHoy:fechaHoy(),
    Concierge,
    Agent,
    In,
    Out,
    Name,
    Tours,
    Nino,
    Adulto,
    estado,
    iva
  }).then((docRef) => {
    db.collection('Clientes').doc(docRef.id).update({
    FechaHoy:fechaHoy(),
    Concierge,
    Agent,
    In,
    Out,
    Name,
    Tours:docRef.id,
    Nino,
    Adulto,
    estado,
    iva
    })
    ND = docRef.id;
    alerta.innerHTML = `El ID es: <strong>${docRef.id}</strong>`;
   console.log("Document written with ID: ", docRef.id);

})
.catch((error) => {
    console.error("Error adding document: ", error);
});

const getTask = () =>db.collection('Clientes').get(); //cada que actualiza

const onGetTask = (callback) => db.collection("Clientes").onSnapshot(callback); //En vivo

window.addEventListener('DOMContentLoaded',   async (e) =>{ 
tr.style.display = 'none';
  Cliente.style.display = 'block';
  alerta.style.display = 'none';
const onGetTask2 = (callback) => db.collection("Proveedores").onSnapshot(callback);
await onGetTask2 ((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
          
            
              provedorArray = doc.data().ArProv;
             Rellena();
            
            

    })
  

})
Rellena();
})
function restaFechas(f1,f2)
 {
  
var fechaInicio = new Date(f1).getTime();
var fechaFin    = new Date(f2).getTime();
var diff = fechaFin - fechaInicio;

return(diff/(1000*60*60*24) );

 }

taskForm.addEventListener('submit', async (e)=>{
  e.preventDefault(); 
  if (enviado == "true") {

    const ID = taskForm['task-ID'].value;
    const Name = taskForm['task-Namet'].value;
    const Description = taskForm['task-Description'].value;
    const In = taskForm['task-Int'].value;
    const Out = taskForm['task-Outt'].value;
    const PlaceIn = taskForm['task-PlaceIn'].value;
    const PlaceOut = taskForm['task-PlaceOut'].value;
    const Price = taskForm['task-Price'].value;
    const PriceProve = taskForm['task-PriceProve'].value;
    const Time = taskForm['task-Time'].value;
    const Proveedor = taskForm["task-Proveedor"].value;
    
    alerta.style.display = 'block';
    saveTours(ID,Name,Description,In,Out,PlaceIn,PlaceOut,Price,PriceProve,Time,Proveedor);
    taskForm['task-ID'].value = "";
    taskForm['task-Namet'].value = "";
    taskForm['task-Description'].value = "";
    taskForm['task-Int'].value = "";
    taskForm['task-Outt'].value = "";
    taskForm['task-PlaceIn'].value = "";
    taskForm['task-PlaceOut'].value = "";
    taskForm['task-Price'].value = "";
    taskForm['task-PriceProve'].value = "";
    taskForm['task-Time'].value = "";
    alert("Tour guardado");
    
      
  }else{
    alerta.style.display = 'block';
    enviado = "true";
    tr.style.display = 'block';
  Cliente.style.display = 'none';
  const Concierge = taskForm['task-Concierge'].value;
  const Agent = taskForm['task-Agent'].value;
  const In = taskForm['task-In'].value;
  const Out = taskForm['task-Out'].value;
  const Name = taskForm['task-Name'].value;
  const Tours = " ";
  const Nino = taskForm['task-Nino'].value;
  const Adulto = taskForm['task-Adulto'].value;
  const IVA = taskForm['task-Iva'].value;

  alert(restaFechas(In,Out)) ;
  element = new informacion(Concierge,Agent,In,Out,Name,Tours,Nino,Adulto,IVA); 
  await saveTask(element.Concierge,element.Agent,element.In, element.Out, element.Name,element.Tours,element.Nino,element.Adulto,element.IVA);
  taskForm['task-Concierge'].value = "";
  taskForm['task-Agent'].value = "";
  taskForm['task-In'].value = "";
  taskForm['task-Out'].value = "";
  taskForm['task-Name'].value = "";
  taskForm['task-Nino'].value = "";
  taskForm['task-Adulto'].value = "";
  taskForm['task-Iva'].value = "";
  }
});


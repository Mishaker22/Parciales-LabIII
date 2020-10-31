var peticionHttp = new XMLHttpRequest();
var listaJson= new Array();
var auto;
var evento;
function Load()
{
  getauto(); 
  var alta=document.getElementById("btnAbrirContenedor");
  alta.addEventListener("click",AbrirContenedor);
}
function getauto()
{    
  peticionHttp.onreadystatechange = callback;
  peticionHttp.open("GET","http://localhost:3000/autos",true);
  peticionHttp.send();
  console.log("termino")
                             
}
function callback()
{
  tabla=document.getElementById("tbDatos");
  if(peticionHttp.readyState===4)
  {
    if(peticionHttp.status===200)
    {
      var respuesta=peticionHttp.responseText;
      var json= JSON.parse(respuesta);
      for(var i=0; i<json.length;i++)
      {
        var listaTr=new Array();
        var auto=new Array(json[i].make,json[i].model,json[i].year);
        var trAuto=CrearNodo(auto);

        tabla.appendChild(trAuto);
        
        var element=document.getElementsByTagName("tr");
        for(var j=0; j<element.length; j++)
        {
          listaTr.push(element[j]);
        }
        DobleClick(listaTr);       
        listaJson.push(json[i]);
      }
      
    }else{
      alert("ERROR");
    }
  }
}
function DobleClick(listaTr)
{
  for(var i=0; i<listaTr.length; i++)
  {
    listaTr[i].addEventListener("dblclick", CompletarCampos, false);
  }
} 
CompletarCampos=function(event)
{
  var name= document.getElementById("name")
  var cuatrimestre= document.getElementById("cuatri");
  var fecha= document.getElementById("dates");
  var turno=document.getElementsByName("Turno");
  if (event.target.tagName == "TD")
  { 
    var fila = event.target.parentNode;
    name.value = fila.children[0].innerHTML
    cuatrimestre.value = fila.children[1].innerHTML
    fecha.value = fila.children[2].innerHTML
    turno.value=fila.children[3].innerHTML
    
    
    if(turno.value=="Mañana")
    {
      turno=document.getElementById("jM").checked=true;
    }else{
      turno=document.getElementById("jN").checked=true;
    }
    if(Compararautos(name.value, cuatrimestre.value, fecha.value)!=false)
    {
      auto=Compararautos(name.value, cuatrimestre.value);
    }
    evento=event;
    Inputs();
  }
}
function Inputs()
{
  AbrirContenedor();
}
function AbrirContenedor()
{
  var div=document.getElementById("div");
  div.hidden=false;
  var btnGuardar=document.getElementById("btnGuardar");
  btnGuardar.addEventListener("click",GuardarClick);
  var btnCancelar=document.getElementById("btnCancelar");
  var btnCerrar=document.getElementById("btnCerrar");
  btnCerrar.addEventListener("click",CerrarContenedor);
  btnCancelar.addEventListener("click", CerrarContenedor);
}
function cerrarCont()
{
  var div=document.getElementById("div");
  div.hidden=true;
}
function Compararautos(nombre, cuatrimestre)
{
  var retorno=false;
  for(var i=0; i<listaJson.length; i++)
  {
    if(nombre == listaJson[i].nombre && cuatrimestre== listaJson[i].cuatrimestre)
    {
      retorno=listaJson[i];
    }
  }
  return retorno;
}
function CerrarContenedor()
{
  var div=document.getElementById("div");
  div.hidden=true;
}

function GuardarClick()
{
  var marca= document.getElementById("marca")
  var modelo= document.getElementById("modelo");
  var año= document.getElementById("year");
  if(ValidarCampos(marca,modelo, año)==true)
  {
    Spinner();
    EjecutarPost(marca,modelo,año);
    EditarTabla(marca,modelo,año);
  }
    
}
function EditarTabla(marca,modelo,año)
{
  var tabla=document.getElementById("tbDatos");
  var aux=new Array(marca.value,modelo.value,año.value);
  var nuevoNodo=CrearNodo(aux);
  tabla.appendChild(nuevoNodo);
}
  
function ValidarCampos(marca, modelo, año)
{
  var retorno=true;
  if(marca.value.length <2)
  {
    marca.className="inputError";
    retorno =false;
  }else{
    marca.className="inputSinError";
  }
  if(modelo.value.length <2)
  {
    modelo.className="inputError";
    retorno =false;
  }else{
    modelo.className="inputSinError";
  }
  if(año<2000 && año>2020)
  {
    año.className="inputError";
    retorno =false;
  }else{
    año.className="inputSinError";
  }
  return retorno;
}
function hoyFecha(){
  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth()+1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if(dia<10)
    dia='0'+dia; //agrega cero si el menor de 10
  if(mes<10)
    mes='0'+mes //agrega cero si el menor de 10
  var fecha=ano+"-"+mes+"-"+dia;
  return fecha;
}
function EjecutarPost(marca,modelo,año)
{
  peticionHttp.onreadystatechange = respuestaPost;
  peticionHttp.open("POST","http://localhost:3000/nuevoAuto");
  peticionHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  peticionHttp.send("make="+marca.value+"&model="+modelo.value+"&year="+año.value);
}
function EjecutarPostModificar(marca,modelo,año)
{
  peticionHttp.onreadystatechange = respuestaPost;
  peticionHttp.open("POST","http://localhost:3000/editarYear");
  peticionHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  peticionHttp.send("make="+marca.value+"&model="+modelo.value+"&year="+año);
}
function respuestaPost(){
  if(peticionHttp.readyState===4){
      if(peticionHttp.status===200){
          $respuesta=peticionHttp.responseText;
          alert($respuesta);
          CerrarSpinner();
          cerrarCont();
      }else{
          alert("ERROR");
      }
  }
}
function $(id)
{
    return document.getElementById(id).value;
}
function Limpiar()
{
  var name= document.getElementById("name");
  var fecha= document.getElementById("dates");
  var turno=document.getElementById("jN");
  var turnoM=document.getElementById("jM");

  name.value="";
  fecha.value="";
  turnoM.checked=false
  turno.checked=false
}
function CrearNodo(auto)
{
  var trAuto=document.createElement("tr");
        
  var tdMake=document.createElement("td");
  var tdModelo=document.createElement("td");
  var tdYear=document.createElement("td");
      
  var txMake= document.createTextNode(auto[0]);
  var txModelo=document.createTextNode(auto[1]);
  var txYear=document.createElement("select");
  txYear.id="years";

  //tabla.appendChild(trAuto);

  tdMake.appendChild(txMake);
  tdModelo.appendChild(txModelo);
  tdYear.appendChild(txYear);
  
  var array = [1996,1995,1967,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
  for (var i = 0; i < auto.length; i++) 
  {
    for(var j=0;j<array.length;j++)
    {
      var option = document.createElement("option");
      
      option.text = array[j];
      txYear.appendChild(option);
    }
  }
  txYear.value=auto[2];
  trAuto.appendChild(tdMake);
  trAuto.appendChild(tdModelo);
  trAuto.appendChild(tdYear);
  txYear.addEventListener("click",ModificarAño,false);
  return trAuto;
}

function Spinner()
{
  var charge=document.getElementById("spinner");
  charge.hidden=false;
  var cerrar=document.getElementById("XCerrar");
  cerrar.addEventListener("click",CerrarSpinner);
}
function CerrarSpinner()
{
  var charge=document.getElementById("spinner");
  charge.hidden=true;
}
function EliminarFila()
{
  Spinner();
  evento.preventDefault();
  var fila = evento.target.parentNode;
  EjecutarPostEliminar(auto)
  var tabla=document.getElementById("tbDatos");
  tabla.removeChild(fila);
  Limpiar();
}
  ModificarAño = function(event)
  { 
    console.log("entro");
    if (event.target.tagName == "TD"){ 
        var fila = event.target.parentNode;
        var marca = fila.children[0].innerHTML // toma el primer valor de la fila
        var modelo= fila.children[1].innerHTML // toma el segundo valor de la fila
        console.log("entro");
      }
      EjecutarPostModificar(marca,modelo,txYear.value);
}

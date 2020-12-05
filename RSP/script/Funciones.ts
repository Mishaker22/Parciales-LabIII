namespace RSP{
    var funcion:Logica;
    window.addEventListener("load",function()
    {
        funcion=new Logica();
        funcion.$("btnAgregar").addEventListener("click", ()=>{
            funcion.Guardar();
        });
        funcion.$("btnLimpiar").addEventListener("click", ()=>{
            funcion.limpiarInputs();
        });
        funcion.$("btnPromedio").addEventListener("click", ()=>{
            funcion.CalcularPromedio();
        });
        funcion.$("selFiltrar").addEventListener("change", ()=>{
            funcion.FiltrarPersonaSexo();
        });
        (<HTMLInputElement>document.getElementById("idOcultar")).addEventListener("change",()=>{
            funcion.FiltrarColumna();
        });
        (<HTMLInputElement>document.getElementById("nombreOcultar")).addEventListener("change", ()=>{
            funcion.FiltrarColumna();
        });
        (<HTMLInputElement>document.getElementById("apellidoOcultar")).addEventListener("change",()=>{
            funcion.FiltrarColumna();
        });
        (<HTMLInputElement>document.getElementById("edadOcultar")).addEventListener("change", ()=>{
            funcion.FiltrarColumna();
        });
        funcion.$("btnBuscar").addEventListener('click', ()=>{
            funcion.FiltrarPorNombre();
        });
        /*funcion.$("btnCerrar").addEventListener("click", CambiarAlta);
        funcion.$("btnClose").addEventListener("click", CambiarAlta);
        funcion.$("selTipo").addEventListener("change", ()=>{
            funcion.CambiarTipoDeVehiculo();
        });
        funcion.$("btnAgregar").addEventListener("click", ()=>{
            funcion.Guardar();
        });
        
        
        */
    });

    export var listaPersonas:Cliente[] = [];

    export class Logica
    {
        public table:HTMLTableElement;
        public txtNombre:HTMLInputElement;
        public txtApellido:HTMLInputElement;
        public txtEdad:HTMLInputElement;
        public selSexo:HTMLSelectElement;
        public selFiltrarNombre:HTMLInputElement;

        public $(element:string):HTMLElement
        {
            return document.getElementById(element);
        }

        constructor()
        {
            this.table = <HTMLTableElement>this.$("tablaPersonas");
            this.txtNombre = <HTMLInputElement>this.$("txtName");
            this.txtApellido = <HTMLInputElement>this.$("txtApellido");
            this.txtEdad = <HTMLInputElement>this.$("txtEdad");
            this.selSexo = <HTMLSelectElement>this.$("selSexo");  
            this.selFiltrarNombre = <HTMLInputElement>this.$("txtSearch");
        }
        public checkValue(element:HTMLInputElement, checkNum:boolean):boolean{

            var retorno:boolean;
            if(element.value == "" || (checkNum && isNaN(parseInt(element.value))))
            {
                element.className = "inputError";
                
                retorno= false;
            }else
            {
                retorno =true;
            }
            
            return retorno;
        }
        public Guardar()
        {
           
            var camposCompletos:boolean=true;
            if(this.checkValue(this.txtNombre, false) && this.checkValue(this.txtApellido, false) && this.checkValue(this.txtEdad, false))
            {
                if(camposCompletos)
                {
                    let id:number;
                    let nombre:string;
                    let apellido:string;
                    let edad:number;

                    if (listaPersonas.length == 0) {
                        id = 1;
                    }
                    else {
                        var listaPersonasAux = listaPersonas;
                        id = listaPersonasAux.reduce(function (maximo, persona) {
                            if (persona.getId() >= maximo) {
                                return persona.getId() + 1;
                            }
                            return maximo;
                        }, 0);
                    }
                    nombre = this.txtNombre.value;
                    apellido = this.txtApellido.value;
                    edad = parseInt(this.txtEdad.value);
                    if (this.selSexo.value=="Femenino") 
                    {
                        let sexo:Sexo=Sexo.Femenino;
                        let persona:Cliente;
                        persona = new Cliente(id, nombre, apellido, edad, sexo)
                        listaPersonas.push(persona);
                        this.CrearTabla(id.toString(), nombre, apellido, edad.toString(), this.selSexo.value);
                        
                    }else
                    {
                        let sexo:Sexo=Sexo.Masculino;
                        let persona:Cliente;
                        persona = new Cliente(id, nombre, apellido, edad, sexo)
                        listaPersonas.push(persona);
                        this.CrearTabla(id.toString(), nombre, apellido, edad.toString(), this.selSexo.value);
                        
                    }
                    
                    
                    
                }

            }
        }
        public limpiarInputs():void{
            this.txtNombre.value = "";
            this.txtApellido.value = "";
            this.txtEdad.value = "";
            this.txtNombre.className = "textBox";
            this.txtApellido.className = "textBox";
            this.txtEdad.className = "textBox";
        }
        public CrearTabla(id:string, nombre:string, apellido:string, edad:string ,sexo:string)
        {
            let row:HTMLTableRowElement = this.table.insertRow();
            let cell:HTMLTableCellElement = row.insertCell();
            
            cell.innerText = id;
            cell = row.insertCell();
            cell.innerText = nombre;
            cell = row.insertCell();
            cell.innerText = apellido;
            cell = row.insertCell();
            cell.innerText = edad;
            cell = row.insertCell();
            cell.innerText = sexo;
            cell = row.insertCell();
            
            funcion.$("btnEliminar").addEventListener("click", ()=>{
                this.eliminarRow(row);
                alert("Se ha eliminado de la tabla")
             });
            
            
        }
        public eliminarRow(row:HTMLTableRowElement)
        {
            let index:number = row.rowIndex - 1;
            listaPersonas.splice(index, 1);
            this.table.deleteRow(index);
        }
        public CalcularPromedio() 
        {
            var listaFiltradaGlobal: Array<Cliente> = new Array<Cliente>();
            var listaEdad: Array<number>;
            var promedio: number;
            if (listaFiltradaGlobal.length > 0) {
                listaEdad = listaFiltradaGlobal.map(x => (<Cliente>x).edad);
                promedio = listaEdad.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            } else {
                listaEdad = listaPersonas.map(x => (<Cliente>x).edad);
                promedio = listaEdad.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            }
            (<HTMLInputElement>document.getElementById("txtPromedio")).value = (promedio / listaEdad.length).toString();
        }
        public clearTable():void{
            
            listaPersonas.forEach(()=>{
                try{
                    this.table.deleteRow(0); 
                }catch(err){
    
                }
            });
        }
        isFemale(persona: Cliente | Persona): persona is Cliente {
            return (<Cliente>persona).sexo;
        }
        public FiltrarPersonaSexo() 
        {
            let selFiltrar:HTMLSelectElement = <HTMLSelectElement>this.$("selFiltrar");
            let personasFiltrados:Cliente[];
            if(selFiltrar.value == "Femenino")
            {
                personasFiltrados = listaPersonas.filter((item)=>{
                    return !this.isFemale(item);
                });
            }else if(selFiltrar.value == "Masculino"){
                personasFiltrados = listaPersonas.filter((item)=>{
                    return this.isFemale(item);
                });
            }else{
                personasFiltrados = listaPersonas;
            }
            this.clearTable();
            personasFiltrados.forEach((item)=>{
                if (selFiltrar.value == "Femenino") 
                {
                    var sexo:string="Femenino"
                    this.CrearTabla(item.id.toString(), item.nombre, item.apellido, item.edad.toString(), sexo);
                }else
                {
                    var sexo:string="Masculino"
                    this.CrearTabla(item.id.toString(), item.nombre, item.apellido, item.edad.toString(), sexo);
                }
            });
        }
        public FiltrarPorNombre() 
        {
            var filtro=this.selFiltrarNombre.value;
            var listaBk:Cliente[];
            listaBk=listaPersonas.filter(persona =>{
               return persona.nombre.toLowerCase().indexOf(filtro) >-1;
            });
            this.clearTable();
            listaBk.forEach((item)=>{
                this.CrearTabla(item.id.toString(), item.nombre, item.apellido, item.edad.toString(),this.selSexo.value);
            });
        }
        FiltrarColumna() 
        {
            var id = (<HTMLInputElement>document.getElementById("idOcultar"));
            var nombre = (<HTMLInputElement>document.getElementById("nombreOcultar"));
            var apellido = (<HTMLInputElement>document.getElementById("apellidoOcultar"));
            var edad = (<HTMLInputElement>document.getElementById("edadOcultar"));
    
            if (id.checked) {
                var tablasIds = document.getElementsByName("idTabla");
                tablasIds.forEach(x => {
                    console.log(tablasIds);
                    x.hidden = false;
                })
            } else {
                var tablasIds = document.getElementsByName("idTabla");
                tablasIds.forEach(x => {
                    x.hidden = true;
                })
            }
            if (nombre.checked) {
                var tablasNombre = document.getElementsByName("nombreTabla");
                tablasNombre.forEach(x => {
                    x.hidden = false;
                    console.log(tablasNombre);
                })
            } else {
                var tablasNombre = document.getElementsByName("nombreTabla");
                tablasNombre.forEach(x => {
                    x.hidden = true;
                })
            }
            if (apellido.checked) {
                var tablasApellido = document.getElementsByName("apellidoTabla");
                tablasApellido.forEach(x => {
                    x.hidden = false;
                })
            } else {
                var tablasApellido = document.getElementsByName("apellidoTabla");
                tablasApellido.forEach(x => {
                    x.hidden = true;
                })
            }
            if (edad.checked) {
                var tablasEdad = document.getElementsByName("edadTabla");
                tablasEdad.forEach(x => {
                    x.hidden = false;
                })
            } else {
                var tablasEdad = document.getElementsByName("edadTabla");
                tablasEdad.forEach(x => {
                    x.hidden = true;
                })
            }
        }

    }
    
}
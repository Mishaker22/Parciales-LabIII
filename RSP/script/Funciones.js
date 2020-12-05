var RSP;
(function (RSP) {
    var funcion;
    window.addEventListener("load", function () {
        funcion = new Logica();
        funcion.$("btnAgregar").addEventListener("click", function () {
            funcion.Guardar();
        });
        funcion.$("btnLimpiar").addEventListener("click", function () {
            funcion.limpiarInputs();
        });
        funcion.$("btnPromedio").addEventListener("click", function () {
            funcion.CalcularPromedio();
        });
        funcion.$("selFiltrar").addEventListener("change", function () {
            funcion.FiltrarPersonaSexo();
        });
        document.getElementById("idOcultar").addEventListener("change", function () {
            funcion.FiltrarColumna();
        });
        document.getElementById("nombreOcultar").addEventListener("change", function () {
            funcion.FiltrarColumna();
        });
        document.getElementById("apellidoOcultar").addEventListener("change", function () {
            funcion.FiltrarColumna();
        });
        document.getElementById("edadOcultar").addEventListener("change", function () {
            funcion.FiltrarColumna();
        });
        funcion.$("btnBuscar").addEventListener('click', function () {
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
    RSP.listaPersonas = [];
    var Logica = /** @class */ (function () {
        function Logica() {
            this.table = this.$("tablaPersonas");
            this.txtNombre = this.$("txtName");
            this.txtApellido = this.$("txtApellido");
            this.txtEdad = this.$("txtEdad");
            this.selSexo = this.$("selSexo");
            this.selFiltrarNombre = this.$("txtSearch");
        }
        Logica.prototype.$ = function (element) {
            return document.getElementById(element);
        };
        Logica.prototype.checkValue = function (element, checkNum) {
            var retorno;
            if (element.value == "" || (checkNum && isNaN(parseInt(element.value)))) {
                element.className = "inputError";
                retorno = false;
            }
            else {
                retorno = true;
            }
            return retorno;
        };
        Logica.prototype.Guardar = function () {
            var camposCompletos = true;
            if (this.checkValue(this.txtNombre, false) && this.checkValue(this.txtApellido, false) && this.checkValue(this.txtEdad, false)) {
                if (camposCompletos) {
                    var id = void 0;
                    var nombre = void 0;
                    var apellido = void 0;
                    var edad = void 0;
                    if (RSP.listaPersonas.length == 0) {
                        id = 1;
                    }
                    else {
                        var listaPersonasAux = RSP.listaPersonas;
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
                    if (this.selSexo.value == "Femenino") {
                        var sexo = RSP.Sexo.Femenino;
                        var persona = void 0;
                        persona = new RSP.Cliente(id, nombre, apellido, edad, sexo);
                        RSP.listaPersonas.push(persona);
                        this.CrearTabla(id.toString(), nombre, apellido, edad.toString(), this.selSexo.value);
                    }
                    else {
                        var sexo = RSP.Sexo.Masculino;
                        var persona = void 0;
                        persona = new RSP.Cliente(id, nombre, apellido, edad, sexo);
                        RSP.listaPersonas.push(persona);
                        this.CrearTabla(id.toString(), nombre, apellido, edad.toString(), this.selSexo.value);
                    }
                }
            }
        };
        Logica.prototype.limpiarInputs = function () {
            this.txtNombre.value = "";
            this.txtApellido.value = "";
            this.txtEdad.value = "";
            this.txtNombre.className = "textBox";
            this.txtApellido.className = "textBox";
            this.txtEdad.className = "textBox";
        };
        Logica.prototype.CrearTabla = function (id, nombre, apellido, edad, sexo) {
            var _this = this;
            var row = this.table.insertRow();
            var cell = row.insertCell();
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
            funcion.$("btnEliminar").addEventListener("click", function () {
                _this.eliminarRow(row);
                alert("Se ha eliminado de la tabla");
            });
        };
        Logica.prototype.eliminarRow = function (row) {
            var index = row.rowIndex - 1;
            RSP.listaPersonas.splice(index, 1);
            this.table.deleteRow(index);
        };
        Logica.prototype.CalcularPromedio = function () {
            var listaFiltradaGlobal = new Array();
            var listaEdad;
            var promedio;
            if (listaFiltradaGlobal.length > 0) {
                listaEdad = listaFiltradaGlobal.map(function (x) { return x.edad; });
                promedio = listaEdad.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            }
            else {
                listaEdad = RSP.listaPersonas.map(function (x) { return x.edad; });
                promedio = listaEdad.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            }
            document.getElementById("txtPromedio").value = (promedio / listaEdad.length).toString();
        };
        Logica.prototype.clearTable = function () {
            var _this = this;
            RSP.listaPersonas.forEach(function () {
                try {
                    _this.table.deleteRow(0);
                }
                catch (err) {
                }
            });
        };
        Logica.prototype.isFemale = function (persona) {
            return persona.sexo;
        };
        Logica.prototype.FiltrarPersonaSexo = function () {
            var _this = this;
            var selFiltrar = this.$("selFiltrar");
            var personasFiltrados;
            if (selFiltrar.value == "Femenino") {
                personasFiltrados = RSP.listaPersonas.filter(function (item) {
                    return !_this.isFemale(item);
                });
            }
            else if (selFiltrar.value == "Masculino") {
                personasFiltrados = RSP.listaPersonas.filter(function (item) {
                    return _this.isFemale(item);
                });
            }
            else {
                personasFiltrados = RSP.listaPersonas;
            }
            this.clearTable();
            personasFiltrados.forEach(function (item) {
                if (selFiltrar.value == "Femenino") {
                    var sexo = "Femenino";
                    _this.CrearTabla(item.id.toString(), item.nombre, item.apellido, item.edad.toString(), sexo);
                }
                else {
                    var sexo = "Masculino";
                    _this.CrearTabla(item.id.toString(), item.nombre, item.apellido, item.edad.toString(), sexo);
                }
            });
        };
        Logica.prototype.FiltrarPorNombre = function () {
            var _this = this;
            var filtro = this.selFiltrarNombre.value;
            var listaBk;
            listaBk = RSP.listaPersonas.filter(function (persona) {
                return persona.nombre.toLowerCase().indexOf(filtro) > -1;
            });
            this.clearTable();
            listaBk.forEach(function (item) {
                _this.CrearTabla(item.id.toString(), item.nombre, item.apellido, item.edad.toString(), _this.selSexo.value);
            });
        };
        Logica.prototype.FiltrarColumna = function () {
            var id = document.getElementById("idOcultar");
            var nombre = document.getElementById("nombreOcultar");
            var apellido = document.getElementById("apellidoOcultar");
            var edad = document.getElementById("edadOcultar");
            if (id.checked) {
                var tablasIds = document.getElementsByName("idTabla");
                tablasIds.forEach(function (x) {
                    console.log(tablasIds);
                    x.hidden = false;
                });
            }
            else {
                var tablasIds = document.getElementsByName("idTabla");
                tablasIds.forEach(function (x) {
                    x.hidden = true;
                });
            }
            if (nombre.checked) {
                var tablasNombre = document.getElementsByName("nombreTabla");
                tablasNombre.forEach(function (x) {
                    x.hidden = false;
                    console.log(tablasNombre);
                });
            }
            else {
                var tablasNombre = document.getElementsByName("nombreTabla");
                tablasNombre.forEach(function (x) {
                    x.hidden = true;
                });
            }
            if (apellido.checked) {
                var tablasApellido = document.getElementsByName("apellidoTabla");
                tablasApellido.forEach(function (x) {
                    x.hidden = false;
                });
            }
            else {
                var tablasApellido = document.getElementsByName("apellidoTabla");
                tablasApellido.forEach(function (x) {
                    x.hidden = true;
                });
            }
            if (edad.checked) {
                var tablasEdad = document.getElementsByName("edadTabla");
                tablasEdad.forEach(function (x) {
                    x.hidden = false;
                });
            }
            else {
                var tablasEdad = document.getElementsByName("edadTabla");
                tablasEdad.forEach(function (x) {
                    x.hidden = true;
                });
            }
        };
        return Logica;
    }());
    RSP.Logica = Logica;
})(RSP || (RSP = {}));

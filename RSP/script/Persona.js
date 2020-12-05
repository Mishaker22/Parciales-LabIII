var RSP;
(function (RSP) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        Persona.prototype.getId = function () {
            return this.id;
        };
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        return Persona;
    }());
    RSP.Persona = Persona;
})(RSP || (RSP = {}));

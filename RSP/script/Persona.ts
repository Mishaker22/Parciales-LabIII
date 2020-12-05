namespace RSP
{
    export class Persona
    {
        public id: number;
        public nombre:string;
        public apellido: string;

        constructor(id:number,nombre:string,apellido:string) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        public getId() {
            return this.id;   
        }

        public getNombre() {
            return this.nombre;   
        }

        public getApellido() {
            return this.apellido;   
        }
        
    }
}
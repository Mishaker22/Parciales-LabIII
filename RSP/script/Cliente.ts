namespace RSP
{
    export enum Sexo{
        Femenino,
        Masculino
    }
    export class Cliente extends Persona
    {
        public sexo: Sexo;
        public edad: Number;
        
        constructor(id:number,nombre:string,apellido:string,edad:number, sexo:Sexo) {
            super(id,nombre,apellido);
            this.edad = edad;
            this.sexo=sexo;
        }
        public getEdad() {
            return this.edad;   
        }

        public getSexo() {
            return this.sexo;   
        }

    }
}
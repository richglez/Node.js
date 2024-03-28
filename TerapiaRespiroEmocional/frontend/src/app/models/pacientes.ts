export interface Paciente{ // descripcion del objeto empleado, proveniente de los atributos de la tabla empleados
    id_paciente?: number,    //atributo es opcional.
    expediente_paciente: string,
    nombre_paciente: string,
    apellido_paterno: string,  
    apellido_materno: string,
    sexo_paciente: string,
    edad_paciente: number,
    ingreso_programa?: string,
    ultima_modificacion? : string,
    nacionalidad: string,
    domicilio: string,
    colonia: string,
    alcaldia_municipio: string,
    entidadFederativa: string,
    diagnostico: string,
    cuidadorPrimario: string,
    tipoPrograma: string
}
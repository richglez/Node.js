export interface Cuidador{
    id_cuidador_paciente?: number,
    nombreCuidador: string,
    apPatCuidador: string,
    apMatCuidador?: string | null, // Permitir que apMatCuidador sea nulo
    sexoCuidador: string,
    edadCuidador: string,
    telefonoCuidador: string,
    num_suplencias: number,
    ultima_modificacion: string,
    ingreso_programa: string
};
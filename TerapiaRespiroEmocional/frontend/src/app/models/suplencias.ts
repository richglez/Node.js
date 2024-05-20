export interface Suplencia {
    id_suplencia?: number;
    dia_suplencia: string;
    hora_inicial: string;
    hora_final: string;
    costoGuardia: number;
    particular: string;
    id_cuidador_paciente?: number; // Add this line
  }
  




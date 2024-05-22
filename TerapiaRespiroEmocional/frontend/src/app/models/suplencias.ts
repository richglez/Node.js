export interface Suplencia {
  id_suplencia?: number;
  id_cuidador_paciente: number;
  dia_suplencia: string;
  hora_inicial: string;
  hora_final: string;
  costoGuardia: number;
  particular: string;
}

export interface Suplencia {
  id_suplencia?: number;
  dia_suplencia: string;
  hora_inicial: string;
  hora_final: string;
  costoGuardia: number;
  particular: string;
  concurrencia_anual: string; // "SI" o "NO"
  id_cuidador_paciente: number;
  id_paciente: number;
}

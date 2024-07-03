export interface Suplencia {
  id_suplencia?: number; // El signo de interrogación indica que es opcional
  dia_suplencia: string;
  hora_inicial: string;
  hora_final: string;
  costoGuardia: number;
  particular: string;
  concurrencia_anual: string;
  id_cuidador_paciente: number;
  id_paciente: number;
}

export interface Entry {
  id_entry: string;
  id_usuario: string;
  date: Date;
  mood: string;
  horas_dormidas: number;
  nivel_focus: number;
  nivel_ansiedad: number;
  hidratacion: number;
  ejercicio: boolean;
  crisis_panico: boolean;
  med_tomada: boolean;
}

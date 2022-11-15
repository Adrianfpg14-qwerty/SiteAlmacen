export interface VentaI {
  id?: number;
  fecha: Date;
  descuento: number;
  total: number;
  subtotal: number;
  created: Date;
  updated: Date;
  cliente_id: number;
  usuario_id: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface Motorcycle {
  id: string;
  clientId: string;
  model: string;
  plate: string;
  year?: string;
}

export type ServiceOrderStatus = 'in_progress' | 'ready' | 'delivered';

export interface ServiceOrder {
  id: string;
  clientId: string;
  motorcycleId: string;
  service: string;
  value: number;
  date: string;
  status: ServiceOrderStatus;
  partsUsed?: { partId: string; quantity: number }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  minQuantity: number;
}

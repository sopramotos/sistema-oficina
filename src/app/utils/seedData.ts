import type { Client, Motorcycle, ServiceOrder, InventoryItem } from '../types';

export function shouldSeedData(): boolean {
  return !localStorage.getItem('workshop_data_seeded');
}

export function markDataAsSeeded(): void {
  localStorage.setItem('workshop_data_seeded', 'true');
}

export function getSeedClients(): Client[] {
  return [
    {
      id: crypto.randomUUID(),
      name: 'João Silva',
      phone: '(11) 98765-4321',
      createdAt: new Date('2026-03-01').toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: 'Maria Santos',
      phone: '(11) 97654-3210',
      createdAt: new Date('2026-03-05').toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: 'Pedro Oliveira',
      phone: '(11) 96543-2109',
      createdAt: new Date('2026-03-10').toISOString(),
    },
  ];
}

export function getSeedMotorcycles(clients: Client[]): Motorcycle[] {
  if (clients.length < 3) return [];

  return [
    {
      id: crypto.randomUUID(),
      clientId: clients[0].id,
      model: 'Honda CG 160',
      plate: 'ABC-1234',
      year: '2022',
    },
    {
      id: crypto.randomUUID(),
      clientId: clients[1].id,
      model: 'Yamaha Factor 150',
      plate: 'DEF-5678',
      year: '2021',
    },
    {
      id: crypto.randomUUID(),
      clientId: clients[2].id,
      model: 'Suzuki GSX-S 750',
      plate: 'GHI-9012',
      year: '2023',
    },
    {
      id: crypto.randomUUID(),
      clientId: clients[0].id,
      model: 'Honda XRE 300',
      plate: 'JKL-3456',
      year: '2020',
    },
  ];
}

export function getSeedServiceOrders(clients: Client[], motorcycles: Motorcycle[]): ServiceOrder[] {
  if (clients.length < 3 || motorcycles.length < 3) return [];

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];

  return [
    {
      id: crypto.randomUUID(),
      clientId: clients[0].id,
      motorcycleId: motorcycles[0].id,
      service: 'Troca de óleo e filtro',
      value: 120.00,
      date: today,
      status: 'delivered',
    },
    {
      id: crypto.randomUUID(),
      clientId: clients[1].id,
      motorcycleId: motorcycles[1].id,
      service: 'Revisão completa dos 10.000 km',
      value: 350.00,
      date: today,
      status: 'ready',
    },
    {
      id: crypto.randomUUID(),
      clientId: clients[2].id,
      motorcycleId: motorcycles[2].id,
      service: 'Troca de pneu traseiro',
      value: 280.00,
      date: yesterday,
      status: 'delivered',
    },
    {
      id: crypto.randomUUID(),
      clientId: clients[0].id,
      motorcycleId: motorcycles[3].id,
      service: 'Regulagem de carburador',
      value: 80.00,
      date: twoDaysAgo,
      status: 'delivered',
    },
    {
      id: crypto.randomUUID(),
      clientId: clients[1].id,
      motorcycleId: motorcycles[1].id,
      service: 'Troca de corrente e coroa',
      value: 450.00,
      date: today,
      status: 'in_progress',
    },
  ];
}

export function getSeedInventory(): InventoryItem[] {
  return [
    {
      id: crypto.randomUUID(),
      name: 'Óleo 10W40',
      quantity: 15,
      category: 'Lubrificantes',
      minQuantity: 5,
    },
    {
      id: crypto.randomUUID(),
      name: 'Filtro de Óleo',
      quantity: 3,
      category: 'Filtros',
      minQuantity: 5,
    },
    {
      id: crypto.randomUUID(),
      name: 'Vela de Ignição NGK',
      quantity: 20,
      category: 'Elétrica',
      minQuantity: 10,
    },
    {
      id: crypto.randomUUID(),
      name: 'Corrente 520',
      quantity: 2,
      category: 'Transmissão',
      minQuantity: 3,
    },
    {
      id: crypto.randomUUID(),
      name: 'Pastilha de Freio Dianteiro',
      quantity: 8,
      category: 'Freios',
      minQuantity: 5,
    },
    {
      id: crypto.randomUUID(),
      name: 'Fluido de Freio DOT 4',
      quantity: 1,
      category: 'Fluidos',
      minQuantity: 3,
    },
  ];
}

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Client, Motorcycle, ServiceOrder, InventoryItem } from '../types';
import {
  shouldSeedData,
  markDataAsSeeded,
  getSeedClients,
  getSeedMotorcycles,
  getSeedServiceOrders,
  getSeedInventory,
} from '../utils/seedData';

export function useWorkshopData() {
  const [clients, setClients] = useLocalStorage<Client[]>('workshop_clients', []);
  const [motorcycles, setMotorcycles] = useLocalStorage<Motorcycle[]>('workshop_motorcycles', []);
  const [serviceOrders, setServiceOrders] = useLocalStorage<ServiceOrder[]>('workshop_orders', []);
  const [inventory, setInventory] = useLocalStorage<InventoryItem[]>('workshop_inventory', []);

  // Seed data on first load
  useEffect(() => {
    if (shouldSeedData()) {
      const seedClients = getSeedClients();
      const seedMotorcycles = getSeedMotorcycles(seedClients);
      const seedServiceOrders = getSeedServiceOrders(seedClients, seedMotorcycles);
      const seedInventory = getSeedInventory();

      setClients(seedClients);
      setMotorcycles(seedMotorcycles);
      setServiceOrders(seedServiceOrders);
      setInventory(seedInventory);

      markDataAsSeeded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Client operations
  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setClients([...clients, newClient]);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    setMotorcycles(motorcycles.filter(m => m.clientId !== id));
    setServiceOrders(serviceOrders.filter(o => o.clientId !== id));
  };

  // Motorcycle operations
  const addMotorcycle = (motorcycle: Omit<Motorcycle, 'id'>) => {
    const newMotorcycle: Motorcycle = {
      ...motorcycle,
      id: crypto.randomUUID(),
    };
    setMotorcycles([...motorcycles, newMotorcycle]);
    return newMotorcycle;
  };

  const updateMotorcycle = (id: string, updates: Partial<Motorcycle>) => {
    setMotorcycles(motorcycles.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMotorcycle = (id: string) => {
    setMotorcycles(motorcycles.filter(m => m.id !== id));
    setServiceOrders(serviceOrders.filter(o => o.motorcycleId !== id));
  };

  // Service Order operations
  const addServiceOrder = (order: Omit<ServiceOrder, 'id'>) => {
    const newOrder: ServiceOrder = {
      ...order,
      id: crypto.randomUUID(),
    };

    // Update inventory if parts were used
    if (order.partsUsed && order.partsUsed.length > 0) {
      setInventory(inventory.map(item => {
        const partUsed = order.partsUsed?.find(p => p.partId === item.id);
        if (partUsed) {
          return { ...item, quantity: item.quantity - partUsed.quantity };
        }
        return item;
      }));
    }

    setServiceOrders([...serviceOrders, newOrder]);
    return newOrder;
  };

  const updateServiceOrder = (id: string, updates: Partial<ServiceOrder>) => {
    setServiceOrders(serviceOrders.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const deleteServiceOrder = (id: string) => {
    setServiceOrders(serviceOrders.filter(o => o.id !== id));
  };

  // Inventory operations
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setInventory([...inventory, newItem]);
    return newItem;
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(inventory.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(inventory.filter(i => i.id !== id));
  };

  // Computed values
  const getLowStockItems = () => {
    return inventory.filter(item => item.quantity <= item.minQuantity);
  };

  const getTodayRevenue = () => {
    const today = new Date().toISOString().split('T')[0];
    return serviceOrders
      .filter(order => order.date.startsWith(today) && order.status === 'delivered')
      .reduce((sum, order) => sum + order.value, 0);
  };

  const getTodayServicesCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return serviceOrders.filter(order => order.date.startsWith(today)).length;
  };

  const getOpenOrdersCount = () => {
    return serviceOrders.filter(order => order.status !== 'delivered').length;
  };

  const getClientMotorcycles = (clientId: string) => {
    return motorcycles.filter(m => m.clientId === clientId);
  };

  const getClientOrders = (clientId: string) => {
    return serviceOrders.filter(o => o.clientId === clientId);
  };

  // Data management
  const importData = (data: {
    clients: Client[];
    motorcycles: Motorcycle[];
    serviceOrders: ServiceOrder[];
    inventory: InventoryItem[];
  }) => {
    setClients(data.clients);
    setMotorcycles(data.motorcycles);
    setServiceOrders(data.serviceOrders);
    setInventory(data.inventory);
  };

  const clearAllData = () => {
    setClients([]);
    setMotorcycles([]);
    setServiceOrders([]);
    setInventory([]);
    localStorage.removeItem('workshop_data_seeded');
  };

  return {
    // Data
    clients,
    motorcycles,
    serviceOrders,
    inventory,

    // Client operations
    addClient,
    updateClient,
    deleteClient,

    // Motorcycle operations
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,

    // Service Order operations
    addServiceOrder,
    updateServiceOrder,
    deleteServiceOrder,

    // Inventory operations
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,

    // Data management
    importData,
    clearAllData,

    // Computed values
    getLowStockItems,
    getTodayRevenue,
    getTodayServicesCount,
    getOpenOrdersCount,
    getClientMotorcycles,
    getClientOrders,
  };
}

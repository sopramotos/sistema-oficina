import { useState } from 'react';
import { LayoutDashboard, Users, Bike, FileText, Package, Menu, Database } from 'lucide-react';
import { useWorkshopData } from './hooks/useWorkshopData';
import { Dashboard } from './components/Dashboard';
import { Clients } from './components/Clients';
import { Motorcycles } from './components/Motorcycles';
import { ServiceOrders } from './components/ServiceOrders';
import { Inventory } from './components/Inventory';
import { DataManagement } from './components/DataManagement';
import { Button } from './components/ui/button';

type Page = 'dashboard' | 'clients' | 'motorcycles' | 'orders' | 'inventory' | 'data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    clients,
    motorcycles,
    serviceOrders,
    inventory,
    addClient,
    updateClient,
    deleteClient,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    addServiceOrder,
    updateServiceOrder,
    deleteServiceOrder,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    importData,
    clearAllData,
    getLowStockItems,
    getTodayRevenue,
    getTodayServicesCount,
    getOpenOrdersCount,
    getClientMotorcycles,
    getClientOrders,
  } = useWorkshopData();

  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients' as Page, label: 'Clientes', icon: Users },
    { id: 'motorcycles' as Page, label: 'Motos', icon: Bike },
    { id: 'orders' as Page, label: 'Ordens de Serviço', icon: FileText },
    { id: 'inventory' as Page, label: 'Estoque', icon: Package },
    { id: 'data' as Page, label: 'Dados', icon: Database },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            todayRevenue={getTodayRevenue()}
            todayServicesCount={getTodayServicesCount()}
            openOrdersCount={getOpenOrdersCount()}
            lowStockItems={getLowStockItems()}
          />
        );
      case 'clients':
        return (
          <Clients
            clients={clients}
            motorcycles={motorcycles}
            serviceOrders={serviceOrders}
            onAddClient={addClient}
            onUpdateClient={updateClient}
            onDeleteClient={deleteClient}
            getClientMotorcycles={getClientMotorcycles}
            getClientOrders={getClientOrders}
          />
        );
      case 'motorcycles':
        return (
          <Motorcycles
            motorcycles={motorcycles}
            clients={clients}
            onAddMotorcycle={addMotorcycle}
            onDeleteMotorcycle={deleteMotorcycle}
          />
        );
      case 'orders':
        return (
          <ServiceOrders
            serviceOrders={serviceOrders}
            clients={clients}
            motorcycles={motorcycles}
            onAddServiceOrder={addServiceOrder}
            onUpdateServiceOrder={updateServiceOrder}
            onDeleteServiceOrder={deleteServiceOrder}
          />
        );
      case 'inventory':
        return (
          <Inventory
            inventory={inventory}
            onAddInventoryItem={addInventoryItem}
            onUpdateInventoryItem={updateInventoryItem}
            onDeleteInventoryItem={deleteInventoryItem}
          />
        );
      case 'data':
        return (
          <DataManagement
            clients={clients}
            motorcycles={motorcycles}
            serviceOrders={serviceOrders}
            inventory={inventory}
            onImportData={importData}
            onClearData={clearAllData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#9ACD32] rounded-lg flex items-center justify-center">
              <Bike className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Oficina Motos</h1>
              <p className="text-xs text-gray-400">Sistema de Gerenciamento</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#9ACD32] text-black font-semibold'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">
              {menuItems.find(item => item.id === currentPage)?.label}
            </h2>
          </div>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-black">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
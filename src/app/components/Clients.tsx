import { useState } from 'react';
import { Plus, Search, Trash2, Edit, History } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import type { Client, ServiceOrder, Motorcycle } from '../types';

interface ClientsProps {
  clients: Client[];
  motorcycles: Motorcycle[];
  serviceOrders: ServiceOrder[];
  onAddClient: (client: { name: string; phone: string }) => void;
  onUpdateClient: (id: string, updates: Partial<Client>) => void;
  onDeleteClient: (id: string) => void;
  getClientMotorcycles: (clientId: string) => Motorcycle[];
  getClientOrders: (clientId: string) => ServiceOrder[];
}

export function Clients({
  clients,
  motorcycles,
  serviceOrders,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  getClientMotorcycles,
  getClientOrders,
}: ClientsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const filteredClients = clients.filter(
    client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      onAddClient(formData);
      setFormData({ name: '', phone: '' });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Clientes</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9ACD32] hover:bg-[#8BC428] text-black">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Novo Cliente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#9ACD32] hover:bg-[#8BC428] text-black">
                Adicionar Cliente
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar cliente por nome ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => {
          const clientMotorcycles = getClientMotorcycles(client.id);
          const clientOrders = getClientOrders(client.id);

          return (
            <Card key={client.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{client.name}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">{client.phone}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteClient(client.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Motos cadastradas:</span>
                  <span className="text-[#9ACD32] font-semibold">{clientMotorcycles.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Serviços realizados:</span>
                  <span className="text-[#9ACD32] font-semibold">{clientOrders.length}</span>
                </div>
                {clientOrders.length > 0 && (
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-500 mb-2">Últimos serviços:</p>
                    {clientOrders.slice(-3).reverse().map(order => (
                      <div key={order.id} className="text-xs text-gray-400 flex justify-between">
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                        <span className="text-[#9ACD32]">R$ {order.value.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Nenhum cliente encontrado</p>
        </div>
      )}
    </div>
  );
}

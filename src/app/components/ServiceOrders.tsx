import { useState } from 'react';
import { Plus, Filter, Trash2, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import type { Client, Motorcycle, ServiceOrder, ServiceOrderStatus } from '../types';

interface ServiceOrdersProps {
  serviceOrders: ServiceOrder[];
  clients: Client[];
  motorcycles: Motorcycle[];
  onAddServiceOrder: (order: Omit<ServiceOrder, 'id'>) => void;
  onUpdateServiceOrder: (id: string, updates: Partial<ServiceOrder>) => void;
  onDeleteServiceOrder: (id: string) => void;
}

export function ServiceOrders({
  serviceOrders,
  clients,
  motorcycles,
  onAddServiceOrder,
  onUpdateServiceOrder,
  onDeleteServiceOrder,
}: ServiceOrdersProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<ServiceOrderStatus | 'all'>('all');
  const [formData, setFormData] = useState({
    clientId: '',
    motorcycleId: '',
    service: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    status: 'in_progress' as ServiceOrderStatus,
  });

  const filteredOrders = serviceOrders.filter(
    order => filterStatus === 'all' || order.status === filterStatus
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientId && formData.motorcycleId && formData.service && formData.value) {
      onAddServiceOrder({
        clientId: formData.clientId,
        motorcycleId: formData.motorcycleId,
        service: formData.service,
        value: parseFloat(formData.value),
        date: formData.date,
        status: formData.status,
      });
      setFormData({
        clientId: '',
        motorcycleId: '',
        service: '',
        value: '',
        date: new Date().toISOString().split('T')[0],
        status: 'in_progress',
      });
      setIsAddDialogOpen(false);
    }
  };

  const getClientName = (clientId: string) => {
    return clients.find(c => c.id === clientId)?.name || 'N/A';
  };

  const getMotorcycleInfo = (motorcycleId: string) => {
    const moto = motorcycles.find(m => m.id === motorcycleId);
    return moto ? `${moto.model} - ${moto.plate}` : 'N/A';
  };

  const getClientMotorcycles = (clientId: string) => {
    return motorcycles.filter(m => m.clientId === clientId);
  };

  const getStatusBadge = (status: ServiceOrderStatus) => {
    const variants = {
      in_progress: { label: 'Em Andamento', className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' },
      ready: { label: 'Pronto', className: 'bg-blue-500/20 text-blue-500 border-blue-500/50' },
      delivered: { label: 'Entregue', className: 'bg-[#9ACD32]/20 text-[#9ACD32] border-[#9ACD32]/50' },
    };
    const variant = variants[status];
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Ordens de Serviço</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9ACD32] hover:bg-[#8BC428] text-black">
              <Plus className="mr-2 h-4 w-4" />
              Nova Ordem
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Criar Ordem de Serviço</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientId" className="text-gray-300">Cliente</Label>
                  <Select
                    value={formData.clientId}
                    onValueChange={(value) => setFormData({ ...formData, clientId: value, motorcycleId: '' })}
                  >
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id} className="text-white">
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="motorcycleId" className="text-gray-300">Moto</Label>
                  <Select
                    value={formData.motorcycleId}
                    onValueChange={(value) => setFormData({ ...formData, motorcycleId: value })}
                    disabled={!formData.clientId}
                  >
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione a moto" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {getClientMotorcycles(formData.clientId).map(moto => (
                        <SelectItem key={moto.id} value={moto.id} className="text-white">
                          {moto.model} - {moto.plate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="service" className="text-gray-300">Serviço Realizado</Label>
                <Textarea
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Descreva o serviço realizado..."
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="value" className="text-gray-300">Valor (R$)</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="text-gray-300">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status" className="text-gray-300">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as ServiceOrderStatus })}
                  >
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="in_progress" className="text-white">Em Andamento</SelectItem>
                      <SelectItem value="ready" className="text-white">Pronto</SelectItem>
                      <SelectItem value="delivered" className="text-white">Entregue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#9ACD32] hover:bg-[#8BC428] text-black">
                Criar Ordem de Serviço
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('all')}
          className={filterStatus === 'all' ? 'bg-[#9ACD32] text-black' : 'border-gray-700 text-gray-300'}
        >
          Todas
        </Button>
        <Button
          variant={filterStatus === 'in_progress' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('in_progress')}
          className={filterStatus === 'in_progress' ? 'bg-[#9ACD32] text-black' : 'border-gray-700 text-gray-300'}
        >
          Em Andamento
        </Button>
        <Button
          variant={filterStatus === 'ready' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('ready')}
          className={filterStatus === 'ready' ? 'bg-[#9ACD32] text-black' : 'border-gray-700 text-gray-300'}
        >
          Prontas
        </Button>
        <Button
          variant={filterStatus === 'delivered' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('delivered')}
          className={filterStatus === 'delivered' ? 'bg-[#9ACD32] text-black' : 'border-gray-700 text-gray-300'}
        >
          Entregues
        </Button>
      </div>

      <div className="space-y-4">
        {filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(order => (
          <Card key={order.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-white">{getClientName(order.clientId)}</CardTitle>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-gray-400 text-sm">{getMotorcycleInfo(order.motorcycleId)}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteServiceOrder(order.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-1">Serviço:</p>
                <p className="text-white">{order.service}</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">Data</p>
                    <p className="text-white text-sm">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Valor</p>
                    <p className="text-[#9ACD32] font-semibold">R$ {order.value.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {order.status !== 'delivered' && (
                    <>
                      {order.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => onUpdateServiceOrder(order.id, { status: 'ready' })}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Marcar como Pronto
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button
                          size="sm"
                          onClick={() => onUpdateServiceOrder(order.id, { status: 'delivered' })}
                          className="bg-[#9ACD32] hover:bg-[#8BC428] text-black"
                        >
                          Marcar como Entregue
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Nenhuma ordem de serviço encontrada</p>
        </div>
      )}
    </div>
  );
}

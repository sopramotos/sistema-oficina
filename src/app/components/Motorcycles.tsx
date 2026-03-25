import { useState } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Client, Motorcycle } from '../types';

interface MotorcyclesProps {
  motorcycles: Motorcycle[];
  clients: Client[];
  onAddMotorcycle: (motorcycle: Omit<Motorcycle, 'id'>) => void;
  onDeleteMotorcycle: (id: string) => void;
}

export function Motorcycles({ motorcycles, clients, onAddMotorcycle, onDeleteMotorcycle }: MotorcyclesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    model: '',
    plate: '',
    year: '',
  });

  const filteredMotorcycles = motorcycles.filter(
    moto =>
      moto.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moto.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientId && formData.model && formData.plate) {
      onAddMotorcycle({
        clientId: formData.clientId,
        model: formData.model,
        plate: formData.plate,
        year: formData.year || undefined,
      });
      setFormData({ clientId: '', model: '', plate: '', year: '' });
      setIsAddDialogOpen(false);
    }
  };

  const getClientName = (clientId: string) => {
    return clients.find(c => c.id === clientId)?.name || 'Cliente não encontrado';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Motos</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9ACD32] hover:bg-[#8BC428] text-black">
              <Plus className="mr-2 h-4 w-4" />
              Nova Moto
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar Nova Moto</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="clientId" className="text-gray-300">Cliente</Label>
                <Select value={formData.clientId} onValueChange={(value) => setFormData({ ...formData, clientId: value })}>
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
                <Label htmlFor="model" className="text-gray-300">Modelo</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Ex: Honda CG 160"
                  required
                />
              </div>
              <div>
                <Label htmlFor="plate" className="text-gray-300">Placa</Label>
                <Input
                  id="plate"
                  value={formData.plate}
                  onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Ex: ABC-1234"
                  required
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-gray-300">Ano (Opcional)</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Ex: 2022"
                />
              </div>
              <Button type="submit" className="w-full bg-[#9ACD32] hover:bg-[#8BC428] text-black">
                Adicionar Moto
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por modelo ou placa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMotorcycles.map(moto => (
          <Card key={moto.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-white">{moto.model}</CardTitle>
                  <p className="text-[#9ACD32] font-mono text-sm mt-1">{moto.plate}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteMotorcycle(moto.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Proprietário:</span>
                <span className="text-white">{getClientName(moto.clientId)}</span>
              </div>
              {moto.year && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Ano:</span>
                  <span className="text-white">{moto.year}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMotorcycles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Nenhuma moto encontrada</p>
        </div>
      )}
    </div>
  );
}

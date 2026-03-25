import { useState } from 'react';
import { Plus, Search, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import type { InventoryItem } from '../types';

interface InventoryProps {
  inventory: InventoryItem[];
  onAddInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  onUpdateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  onDeleteInventoryItem: (id: string) => void;
}

export function Inventory({
  inventory,
  onAddInventoryItem,
  onUpdateInventoryItem,
  onDeleteInventoryItem,
}: InventoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    minQuantity: '5',
  });

  const filteredInventory = inventory.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.quantity && formData.category) {
      if (editingItem) {
        onUpdateInventoryItem(editingItem.id, {
          name: formData.name,
          quantity: parseInt(formData.quantity),
          category: formData.category,
          minQuantity: parseInt(formData.minQuantity),
        });
        setEditingItem(null);
      } else {
        onAddInventoryItem({
          name: formData.name,
          quantity: parseInt(formData.quantity),
          category: formData.category,
          minQuantity: parseInt(formData.minQuantity),
        });
      }
      setFormData({ name: '', quantity: '', category: '', minQuantity: '5' });
      setIsAddDialogOpen(false);
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity.toString(),
      category: item.category,
      minQuantity: item.minQuantity.toString(),
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = inventory.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + delta);
      onUpdateInventoryItem(id, { quantity: newQuantity });
    }
  };

  const isLowStock = (item: InventoryItem) => item.quantity <= item.minQuantity;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Estoque</h1>
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) {
              setEditingItem(null);
              setFormData({ name: '', quantity: '', category: '', minQuantity: '5' });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#9ACD32] hover:bg-[#8BC428] text-black">
              <Plus className="mr-2 h-4 w-4" />
              Nova Peça
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingItem ? 'Editar Peça' : 'Adicionar Nova Peça'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome da Peça</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Ex: Óleo 10W40"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-gray-300">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Ex: Lubrificantes"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="text-gray-300">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="minQuantity" className="text-gray-300">Estoque Mínimo</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    min="0"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#9ACD32] hover:bg-[#8BC428] text-black">
                {editingItem ? 'Atualizar Peça' : 'Adicionar Peça'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar peça ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInventory.map(item => (
          <Card
            key={item.id}
            className={`bg-gray-800 border-gray-700 ${isLowStock(item) ? 'border-yellow-500/50' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-white">{item.name}</CardTitle>
                    {isLowStock(item) && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteInventoryItem(item.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Quantidade:</span>
                <span className={`font-bold text-lg ${isLowStock(item) ? 'text-yellow-500' : 'text-[#9ACD32]'}`}>
                  {item.quantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">Estoque mínimo:</span>
                <span className="text-gray-500 text-xs">{item.minQuantity}</span>
              </div>
              {isLowStock(item) && (
                <div className="pt-2 border-t border-yellow-500/20">
                  <p className="text-yellow-500 text-xs">⚠️ Estoque baixo! Reabastecer</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  disabled={item.quantity === 0}
                >
                  -1
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                  className="flex-1 bg-[#9ACD32] hover:bg-[#8BC428] text-black"
                >
                  +1
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Nenhuma peça encontrada</p>
        </div>
      )}
    </div>
  );
}

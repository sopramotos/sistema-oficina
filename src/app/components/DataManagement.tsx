import { Download, Upload, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Client, Motorcycle, ServiceOrder, InventoryItem } from '../types';

interface DataManagementProps {
  clients: Client[];
  motorcycles: Motorcycle[];
  serviceOrders: ServiceOrder[];
  inventory: InventoryItem[];
  onImportData: (data: {
    clients: Client[];
    motorcycles: Motorcycle[];
    serviceOrders: ServiceOrder[];
    inventory: InventoryItem[];
  }) => void;
  onClearData: () => void;
}

export function DataManagement({
  clients,
  motorcycles,
  serviceOrders,
  inventory,
  onImportData,
  onClearData,
}: DataManagementProps) {
  const handleExport = () => {
    const data = {
      clients,
      motorcycles,
      serviceOrders,
      inventory,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oficina-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.clients && data.motorcycles && data.serviceOrders && data.inventory) {
          onImportData({
            clients: data.clients,
            motorcycles: data.motorcycles,
            serviceOrders: data.serviceOrders,
            inventory: data.inventory,
          });
          alert('Dados importados com sucesso!');
        } else {
          alert('Arquivo inválido. Certifique-se de importar um backup válido.');
        }
      } catch (error) {
        alert('Erro ao importar dados. Verifique se o arquivo é válido.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita!')) {
      onClearData();
      alert('Todos os dados foram removidos.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Gerenciamento de Dados</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Download className="h-5 w-5 text-[#9ACD32]" />
              Exportar Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-300 text-sm">
              Faça backup de todos os seus dados (clientes, motos, ordens e estoque) em um arquivo JSON.
            </p>
            <Button
              onClick={handleExport}
              className="w-full bg-[#9ACD32] hover:bg-[#8BC428] text-black"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar Backup
            </Button>
            <div className="pt-3 border-t border-gray-700 space-y-1 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Clientes:</span>
                <span className="text-[#9ACD32]">{clients.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Motos:</span>
                <span className="text-[#9ACD32]">{motorcycles.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Ordens de Serviço:</span>
                <span className="text-[#9ACD32]">{serviceOrders.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Itens do Estoque:</span>
                <span className="text-[#9ACD32]">{inventory.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              Importar Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-300 text-sm">
              Restaure seus dados a partir de um arquivo de backup JSON.
            </p>
            <input
              id="import-file"
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => document.getElementById('import-file')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Importar Backup
            </Button>
            <p className="text-xs text-yellow-500 pt-2">
              ⚠️ Importar um backup substituirá todos os dados atuais.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Limpar Todos os Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-300 text-sm">
              Remove permanentemente todos os dados do sistema. Use com cuidado!
            </p>
            <Button
              onClick={handleClearData}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Todos os Dados
            </Button>
            <p className="text-xs text-red-500 pt-2">
              ⚠️ Esta ação não pode ser desfeita. Faça um backup antes!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>
              <strong className="text-[#9ACD32]">Armazenamento:</strong> LocalStorage do navegador
            </p>
            <p>
              <strong className="text-[#9ACD32]">Backup:</strong> Recomendado semanalmente
            </p>
            <p className="text-xs text-gray-400 pt-2">
              Os dados são armazenados localmente no seu navegador. Se limpar os dados do navegador,
              os dados da oficina serão perdidos. Mantenha backups regulares!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

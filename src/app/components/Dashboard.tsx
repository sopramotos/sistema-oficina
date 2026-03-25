import { DollarSign, Wrench, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DashboardProps {
  todayRevenue: number;
  todayServicesCount: number;
  openOrdersCount: number;
  lowStockItems: { id: string; name: string; quantity: number }[];
}

export function Dashboard({ todayRevenue, todayServicesCount, openOrdersCount, lowStockItems }: DashboardProps) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Faturamento Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-[#9ACD32]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              R$ {todayRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Serviços Hoje</CardTitle>
            <Wrench className="h-4 w-4 text-[#9ACD32]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{todayServicesCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Ordens em Aberto</CardTitle>
            <FileText className="h-4 w-4 text-[#9ACD32]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{openOrdersCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Alertas de Estoque</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{lowStockItems.length}</div>
          </CardContent>
        </Card>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Alertas de Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-900 rounded-lg border border-yellow-500/20">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-yellow-500 font-semibold">
                    {item.quantity} unidades restantes
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

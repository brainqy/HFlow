
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch, PlusCircle, FileText, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { placeholderSupplyItems } from '@/lib/placeholder-data';
import { useToast } from "@/hooks/use-toast";

export default function NurseSuppliesPage() {
  const { toast } = useToast();
  // Placeholder data for supplies - if not already in placeholder-data.ts
  const supplyItems = placeholderSupplyItems || [
    { id: 's1', name: '10cc Syringes', category: 'Medical Consumables', stockLevel: 50, reorderPoint: 20, status: 'In Stock' },
    { id: 's2', name: 'Gauze Pads (4x4)', category: 'Wound Care', stockLevel: 15, reorderPoint: 30, status: 'Low Stock' },
    { id: 's3', name: 'Alcohol Swabs', category: 'Medical Consumables', stockLevel: 200, reorderPoint: 100, status: 'In Stock' },
    { id: 's4', name: 'Disposable Gloves (M)', category: 'PPE', stockLevel: 35, reorderPoint: 50, status: 'Low Stock' },
    { id: 's5', name: 'Saline Solution (500ml)', category: 'IV Fluids', stockLevel: 10, reorderPoint: 5, status: 'Critical' },
  ];

  const handleRequestNewItem = () => {
    toast({
      title: "Item Request Submitted",
      description: "Your request for a new supply item has been sent to administration (mocked).",
    });
  };

  const handleLogStockUpdate = () => {
    toast({
      title: "Stock Update Logged",
      description: "Stock levels have been updated (mocked).",
    });
  };


  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <PackageSearch className="h-8 w-8" /> Supplies Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage medical supply inventory.
          </p>
        </div>
         <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleRequestNewItem}><FileText className="mr-2 h-4 w-4"/>Request New Item</Button>
            <Button className="w-full sm:w-auto" onClick={handleLogStockUpdate}><PlusCircle className="mr-2 h-4 w-4"/>Log Stock Update</Button>
        </div>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Supply Inventory</CardTitle>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2">
            <CardDescription>
                Current stock levels and statuses.
            </CardDescription>
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search supplies..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
           <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead className="hidden md:table-cell">Reorder Point</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplyItems.map((item) => (
                  <TableRow key={item.id} className={item.status === 'Critical' ? 'bg-destructive/10 hover:bg-destructive/20' : ''}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{item.category}</TableCell>
                    <TableCell>{item.stockLevel}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.reorderPoint}</TableCell>
                    <TableCell>
                      <Badge variant={
                        item.status === 'In Stock' ? 'default' :
                        item.status === 'Low Stock' ? 'secondary' :
                        'destructive'
                      } className="flex items-center gap-1 whitespace-nowrap">
                        {item.status === 'Critical' && <Bell className="h-3 w-3"/>}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="sm" onClick={() => toast({title: "Details Viewed", description: `Viewing details for ${item.name} (mocked).`})}>Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

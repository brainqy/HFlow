
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch, PlusCircle, FileText, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Placeholder data for supplies
const supplyItems = [
  { id: 's1', name: '10cc Syringes', category: 'Medical Consumables', stockLevel: 50, reorderPoint: 20, status: 'In Stock' },
  { id: 's2', name: 'Gauze Pads (4x4)', category: 'Wound Care', stockLevel: 15, reorderPoint: 30, status: 'Low Stock' },
  { id: 's3', name: 'Alcohol Swabs', category: 'Medical Consumables', stockLevel: 200, reorderPoint: 100, status: 'In Stock' },
  { id: 's4', name: 'Disposable Gloves (M)', category: 'PPE', stockLevel: 35, reorderPoint: 50, status: 'Low Stock' },
  { id: 's5', name: 'Saline Solution (500ml)', category: 'IV Fluids', stockLevel: 10, reorderPoint: 5, status: 'Critical' },
];


export default function NurseSuppliesPage() {
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
         <div className="flex gap-2">
            <Button variant="outline"><FileText className="mr-2 h-4 w-4"/>Request New Item</Button>
            <Button><PlusCircle className="mr-2 h-4 w-4"/>Log Stock Update</Button>
        </div>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Supply Inventory</CardTitle>
          <CardDescription>
            Current stock levels and statuses.
            <Input placeholder="Search supplies..." className="max-w-sm mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Reorder Point</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplyItems.map((item) => (
                  <TableRow key={item.id} className={item.status === 'Critical' ? 'bg-destructive/10' : ''}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.stockLevel}</TableCell>
                    <TableCell>{item.reorderPoint}</TableCell>
                    <TableCell>
                      <Badge variant={
                        item.status === 'In Stock' ? 'default' :
                        item.status === 'Low Stock' ? 'secondary' :
                        'destructive'
                      }>
                        {item.status === 'Critical' && <Bell className="mr-1 h-3 w-3"/>}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="sm">Details</Button>
                       <Button variant="ghost" size="sm">Adjust Stock</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground text-center">
        This is a placeholder page. Full supplies management functionality will be implemented here.
      </p>
    </div>
  );
}

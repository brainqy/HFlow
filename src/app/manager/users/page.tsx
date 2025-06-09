
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { placeholderDoctorPatients, placeholderDoctors, placeholderNurses, placeholderReceptionists, placeholderManagerUsers } from '@/lib/placeholder-data';
import type { ManagedUser, UserRole } from '@/types';
import { Users, Edit3, Trash2, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';


const userRoles: UserRole[] = ['Patient', 'Doctor', 'Nurse', 'Receptionist', 'Manager', 'Visiting Doctor']; // Added Visiting Doctor

const userFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  role: z.enum(userRoles as [UserRole, ...UserRole[]], { required_error: "Role is required."}), 
  password: z.string().min(8, "Password must be at least 8 characters.").optional(), 
  status: z.enum(['Active', 'Inactive']).optional(),
  specialty: z.string().optional(), // For Doctor and Visiting Doctor
  assignmentPeriod: z.string().optional(), // For Visiting Doctor
});

type UserFormValues = z.infer<typeof userFormSchema>;


const mapToManagedUser = (data: any[], role: UserRole, defaultEmailDomain: string): ManagedUser[] => {
    return data.map((item, index) => ({
        id: `${role.toLowerCase()}-${item.id || index + 1}`,
        name: item.name,
        role: role,
        email: item.email || `${item.name.toLowerCase().replace(/\s+/g, '.').replace('dr.', '')}@${defaultEmailDomain}`,
        status: 'Active' as const,
        lastLogin: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))).toLocaleDateString(),
        specialty: role === 'Doctor' ? item.specialty : undefined,
    }));
};

export default function ManagerUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [currentUserToEdit, setCurrentUserToEdit] = useState<ManagedUser | null>(null);

  useEffect(() => {
    const initialUsers: ManagedUser[] = [
      ...mapToManagedUser(placeholderDoctorPatients, 'Patient', 'example.com'),
      ...mapToManagedUser(placeholderDoctors, 'Doctor', 'healthflow.clinic'),
      ...mapToManagedUser(placeholderNurses, 'Nurse', 'healthflow.clinic'),
      ...mapToManagedUser(placeholderReceptionists, 'Receptionist', 'healthflow.clinic'),
      ...placeholderManagerUsers // Includes Admin and Visiting Doctors
    ];
    setUsers(initialUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(user => roleFilter === 'all' || user.role === roleFilter);
  }, [users, searchTerm, roleFilter]);

  const { register: registerAdd, handleSubmit: handleSubmitAdd, control: controlAdd, reset: resetAdd, watch: watchAdd, formState: { errors: errorsAdd } } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema.refine(data => data.password, { message: "Password is required for new users.", path: ["password"]})),
  });

  const { register: registerEdit, handleSubmit: handleSubmitEdit, control: controlEdit, reset: resetEdit, watch: watchEdit, formState: { errors: errorsEdit }, setValue: setValueEdit } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  const selectedRoleAdd = watchAdd("role");
  const selectedRoleEdit = watchEdit("role");

  const handleOpenAddUserDialog = () => {
    resetAdd({ name: '', email: '', role: undefined, password: '', specialty: '', assignmentPeriod: ''});
    setIsAddUserDialogOpen(true);
  };

  const handleOpenEditUserDialog = (user: ManagedUser) => {
    setCurrentUserToEdit(user);
    resetEdit({ name: user.name, email: user.email, role: user.role, status: user.status, specialty: user.specialty, assignmentPeriod: user.assignmentPeriod });
    setIsEditUserDialogOpen(true);
  };

  const onAddUserSubmit = (data: UserFormValues) => {
    const newUser: ManagedUser = {
      id: `${data.role.toLowerCase().replace(' ', '-')}-${new Date().getTime()}`, 
      name: data.name,
      email: data.email,
      role: data.role,
      status: 'Active',
      lastLogin: 'Never',
      specialty: (data.role === 'Doctor' || data.role === 'Visiting Doctor') ? data.specialty : undefined,
      assignmentPeriod: data.role === 'Visiting Doctor' ? data.assignmentPeriod : undefined,
    };
    setUsers(prev => [newUser, ...prev]);
    toast({ title: "User Added", description: `${data.name} has been added successfully.` });
    setIsAddUserDialogOpen(false);
  };

  const onEditUserSubmit = (data: UserFormValues) => {
    if (!currentUserToEdit) return;
    const updatedUser = { 
        ...currentUserToEdit, 
        ...data, 
        status: data.status || currentUserToEdit.status,
        specialty: (data.role === 'Doctor' || data.role === 'Visiting Doctor') ? data.specialty : undefined,
        assignmentPeriod: data.role === 'Visiting Doctor' ? data.assignmentPeriod : undefined,
    };
    setUsers(prev => prev.map(u => u.id === currentUserToEdit.id ? updatedUser : u));
    toast({ title: "User Updated", description: `${data.name}'s information has been updated.` });
    setIsEditUserDialogOpen(false);
    setCurrentUserToEdit(null);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        toast({
            title: `User ${newStatus === 'Active' ? 'Activated' : 'Deactivated'}`,
            description: `${u.name}'s status changed to ${newStatus}.`
        });
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };
  
  const getRoleBadgeVariant = (role: UserRole) => {
    switch(role) {
        case 'Doctor': return 'secondary';
        case 'Manager': return 'destructive';
        case 'Nurse': return 'default'; 
        case 'Receptionist': return 'outline'; 
        case 'Patient': return 'outline';
        case 'Visiting Doctor': return 'default'; // Using 'default' which is primary color
        default: return 'outline';
    }
  };


  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <Users className="h-8 w-8" /> User Management
            </h1>
            <p className="text-muted-foreground mt-1">
            View, edit, and manage all user accounts in the system.
            </p>
        </div>
        <Button onClick={handleOpenAddUserDialog}>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">User List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Input 
                    placeholder="Search by name or email..." 
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | 'all')}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {userRoles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Specialty/Assignment</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                        <Badge 
                            variant={getRoleBadgeVariant(user.role)} 
                            className={cn(user.role === 'Receptionist' ? 'border-purple-500 text-purple-600' : '', user.role === 'Visiting Doctor' ? 'bg-teal-500 hover:bg-teal-600 text-white' : '')}
                        >
                            {user.role}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs">
                        {user.role === 'Doctor' && user.specialty}
                        {user.role === 'Visiting Doctor' && `${user.specialty || 'N/A'} (${user.assignmentPeriod || 'N/A'})`}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={user.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : ''}>
                            {user.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.lastLogin || 'Never'}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="hover:text-yellow-500" onClick={() => handleOpenEditUserDialog(user)}>
                        <Edit3 className="h-4 w-4" /> <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className={user.status === 'Active' ? "hover:text-destructive" : "hover:text-green-500"} onClick={() => handleToggleUserStatus(user.id)}>
                        {user.status === 'Active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <span className="sr-only">{user.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No users found matching your criteria.</p>
          )}
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Fill in the details for the new user account.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd(onAddUserSubmit)} className="space-y-4 py-4">
            <div>
              <Label htmlFor="add-name">Name</Label>
              <Input id="add-name" {...registerAdd("name")} />
              {errorsAdd.name && <p className="text-xs text-destructive mt-1">{errorsAdd.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="add-email">Email</Label>
              <Input id="add-email" type="email" {...registerAdd("email")} />
              {errorsAdd.email && <p className="text-xs text-destructive mt-1">{errorsAdd.email.message}</p>}
            </div>
            <div>
                <Label htmlFor="add-role">Role</Label>
                <Controller
                    name="role"
                    control={controlAdd}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="add-role"><SelectValue placeholder="Select a role" /></SelectTrigger>
                            <SelectContent>
                                {userRoles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errorsAdd.role && <p className="text-xs text-destructive mt-1">{errorsAdd.role.message}</p>}
            </div>
             {(selectedRoleAdd === 'Doctor' || selectedRoleAdd === 'Visiting Doctor') && (
                <div>
                    <Label htmlFor="add-specialty">Specialty</Label>
                    <Input id="add-specialty" {...registerAdd("specialty")} />
                    {errorsAdd.specialty && <p className="text-xs text-destructive mt-1">{errorsAdd.specialty.message}</p>}
                </div>
            )}
            {selectedRoleAdd === 'Visiting Doctor' && (
                <div>
                    <Label htmlFor="add-assignmentPeriod">Assignment Period (e.g., Aug 15 - Aug 30)</Label>
                    <Input id="add-assignmentPeriod" {...registerAdd("assignmentPeriod")} />
                    {errorsAdd.assignmentPeriod && <p className="text-xs text-destructive mt-1">{errorsAdd.assignmentPeriod.message}</p>}
                </div>
            )}
            <div>
              <Label htmlFor="add-password">Password</Label>
              <Input id="add-password" type="password" {...registerAdd("password")} />
              {errorsAdd.password && <p className="text-xs text-destructive mt-1">{errorsAdd.password.message}</p>}
            </div>
            <DialogFooter>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      {currentUserToEdit && (
        <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit User: {currentUserToEdit.name}</DialogTitle>
              <DialogDescription>Update the user's information.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitEdit(onEditUserSubmit)} className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" {...registerEdit("name")} />
                {errorsEdit.name && <p className="text-xs text-destructive mt-1">{errorsEdit.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" {...registerEdit("email")} />
                {errorsEdit.email && <p className="text-xs text-destructive mt-1">{errorsEdit.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="edit-role">Role</Label>
                 <Controller
                    name="role"
                    control={controlEdit}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="edit-role"><SelectValue placeholder="Select a role" /></SelectTrigger>
                            <SelectContent>
                                {userRoles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errorsEdit.role && <p className="text-xs text-destructive mt-1">{errorsEdit.role.message}</p>}
              </div>
              {(selectedRoleEdit === 'Doctor' || selectedRoleEdit === 'Visiting Doctor') && (
                <div>
                    <Label htmlFor="edit-specialty">Specialty</Label>
                    <Input id="edit-specialty" {...registerEdit("specialty")} />
                    {errorsEdit.specialty && <p className="text-xs text-destructive mt-1">{errorsEdit.specialty.message}</p>}
                </div>
              )}
              {selectedRoleEdit === 'Visiting Doctor' && (
                  <div>
                      <Label htmlFor="edit-assignmentPeriod">Assignment Period (e.g., Aug 15 - Aug 30)</Label>
                      <Input id="edit-assignmentPeriod" {...registerEdit("assignmentPeriod")} />
                      {errorsEdit.assignmentPeriod && <p className="text-xs text-destructive mt-1">{errorsEdit.assignmentPeriod.message}</p>}
                  </div>
              )}
               <div>
                <Label htmlFor="edit-status">Status</Label>
                 <Controller
                    name="status"
                    control={controlEdit}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="edit-status"><SelectValue placeholder="Select status" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errorsEdit.status && <p className="text-xs text-destructive mt-1">{errorsEdit.status.message}</p>}
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderDoctorPatients, placeholderDoctors, placeholderNursePatientQueue } from '@/lib/placeholder-data';
import { Users, Edit3, Trash2, Eye, Filter, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo } from 'react';

// Combine users from different sources
interface CombinedUser {
  id: string;
  name: string;
  role: 'Patient' | 'Doctor' | 'Nurse';
  email?: string; // Doctors have email from placeholderDoctors (but not exposed in type), nurses and patients don't.
  status: 'Active' | 'Inactive'; // Placeholder status
  lastLogin?: string; // Placeholder
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const combinedUsers: CombinedUser[] = useMemo(() => {
    const patients = placeholderDoctorPatients.map(p => ({ 
        id: `patient-${p.id}`, 
        name: p.name, 
        role: 'Patient' as const, 
        email: `${p.name.toLowerCase().replace(/\s+/g, '.')}@example.com`, // Fake email
        status: 'Active' as const,
        lastLogin: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))).toLocaleDateString()
    }));
    const doctors = placeholderDoctors.map(d => ({ 
        id: `doctor-${d.id}`, 
        name: d.name, 
        role: 'Doctor' as const, 
        email: `${d.name.toLowerCase().replace('dr. ', '').replace(/\s+/g, '.')}@healthflow.clinic`, // Fake email
        status: 'Active' as const,
        lastLogin: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10))).toLocaleDateString()

    }));
    // Adding a few placeholder nurses
    const nurses: CombinedUser[] = [
        { id: 'nurse-1', name: 'Nurse Alex Miller', role: 'Nurse', email: 'alex.miller@healthflow.clinic', status: 'Active', lastLogin: new Date().toLocaleDateString() },
        { id: 'nurse-2', name: 'Nurse Jordan Lee', role: 'Nurse', email: 'jordan.lee@healthflow.clinic', status: 'Active', lastLogin: new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString() },
    ];
    return [...patients, ...doctors, ...nurses];
  }, []);

  const filteredUsers = useMemo(() => {
    return combinedUsers
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(user => roleFilter === 'all' || user.role.toLowerCase() === roleFilter);
  }, [combinedUsers, searchTerm, roleFilter]);


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
        <Button>
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
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
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
                        <Badge variant={
                            user.role === 'Doctor' ? 'secondary' : 
                            user.role === 'Nurse' ? 'default' : 
                            'outline'
                        }>{user.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user.email || 'N/A'}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={user.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : ''}>
                            {user.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.lastLogin || 'Never'}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Eye className="h-4 w-4" /> <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-yellow-500">
                        <Edit3 className="h-4 w-4" /> <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-destructive">
                        <Trash2 className="h-4 w-4" /> <span className="sr-only">Deactivate</span>
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
    </div>
  );
}

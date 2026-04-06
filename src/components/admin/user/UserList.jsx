import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, Settings, UserCheck } from 'lucide-react';

const UserList = ({ 
  users, 
  selectedUser, 
  setSelectedUser, 
  getUserModuleAccess, 
  getUserPermissions 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users ({users.length})</CardTitle>
        <CardDescription>
          Click on a user to manage their permissions and module access
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[30rem] overflow-y-auto">
          {users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No users found matching your criteria.
            </div>
          ) : (
            users.map((user) => {
              const userModules = getUserModuleAccess(user.user_id);
              const userPerms = getUserPermissions(user.user_id);
              
              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-slate-800">{user.full_name || 'Unnamed User'}</h3>
                        <Badge className="text-xs bg-green-100 text-green-800">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      {user.company && (
                        <p className="text-sm text-gray-600 mb-1">
                          <Building className="h-3 w-3 inline mr-1" />
                          {user.company}
                        </p>
                      )}
                      {user.position && (
                        <p className="text-sm text-gray-500 mb-2">{user.position}</p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>{userModules.length} modules</span>
                        <span>{userPerms.length} permissions</span>
                        <span>
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Settings className="h-4 w-4 text-gray-400 ml-2 mt-1" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserList;
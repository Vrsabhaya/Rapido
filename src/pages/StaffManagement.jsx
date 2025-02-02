import { useState, useEffect } from 'react';
import { 
  UserPlusIcon, PencilIcon, TrashIcon, 
  CheckIcon, XMarkIcon, ChartBarIcon 
} from '@heroicons/react/24/outline';
import CertificationUpload from '../components/CertificationUpload';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [newStaffMember, setNewStaffMember] = useState({
    name: '',
    email: '',
    role: 'technician',
    skills: [],
    certifications: [],
    availability: {
      monday: { morning: false, afternoon: false, evening: false },
      tuesday: { morning: false, afternoon: false, evening: false },
      wednesday: { morning: false, afternoon: false, evening: false },
      thursday: { morning: false, afternoon: false, evening: false },
      friday: { morning: false, afternoon: false, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false }
    },
    metrics: {
      jobsCompleted: 0,
      rating: 0,
      onTimeRate: 0
    }
  });

  const roles = ['admin', 'manager', 'technician'];
  const skills = ['Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Painting', 'Cleaning'];
  const timeSlots = ['morning', 'afternoon', 'evening'];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  useEffect(() => {
    // In a real app, this would be an API call
    const mockStaff = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'technician',
        skills: ['Plumbing', 'HVAC'],
        certifications: ['Master Plumber'],
        availability: {
          monday: { morning: true, afternoon: true, evening: false },
          tuesday: { morning: true, afternoon: true, evening: false },
          wednesday: { morning: true, afternoon: true, evening: false },
          thursday: { morning: true, afternoon: true, evening: false },
          friday: { morning: true, afternoon: true, evening: false },
          saturday: { morning: false, afternoon: false, evening: false },
          sunday: { morning: false, afternoon: false, evening: false }
        },
        metrics: {
          jobsCompleted: 150,
          rating: 4.8,
          onTimeRate: 95
        }
      }
    ];
    setStaff(mockStaff);
  }, []);

  const handleEdit = (member) => {
    setEditingId(member.id);
    setNewStaffMember(member);
  };

  const handleSave = (id) => {
    const updatedStaff = staff.map(member =>
      member.id === id ? { ...member, ...newStaffMember } : member
    );
    setStaff(updatedStaff);
    setEditingId(null);
    // In a real app, this would be an API call
    localStorage.setItem('staff', JSON.stringify(updatedStaff));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const updatedStaff = staff.filter(member => member.id !== id);
      setStaff(updatedStaff);
      // In a real app, this would be an API call
      localStorage.setItem('staff', JSON.stringify(updatedStaff));
    }
  };

  const handleAddNew = () => {
    const newId = Math.max(...staff.map(s => s.id)) + 1;
    const staffMemberToAdd = {
      id: newId,
      ...newStaffMember
    };
    
    const updatedStaff = [...staff, staffMemberToAdd];
    setStaff(updatedStaff);
    setIsAddingNew(false);
    setNewStaffMember({
      name: '',
      email: '',
      role: 'technician',
      skills: [],
      certifications: [],
      availability: {
        monday: { morning: false, afternoon: false, evening: false },
        tuesday: { morning: false, afternoon: false, evening: false },
        wednesday: { morning: false, afternoon: false, evening: false },
        thursday: { morning: false, afternoon: false, evening: false },
        friday: { morning: false, afternoon: false, evening: false },
        saturday: { morning: false, afternoon: false, evening: false },
        sunday: { morning: false, afternoon: false, evening: false }
      },
      metrics: {
        jobsCompleted: 0,
        rating: 0,
        onTimeRate: 0
      }
    });
    // In a real app, this would be an API call
    localStorage.setItem('staff', JSON.stringify(updatedStaff));
  };

  const toggleSkill = (skill) => {
    const updatedSkills = newStaffMember.skills.includes(skill)
      ? newStaffMember.skills.filter(s => s !== skill)
      : [...newStaffMember.skills, skill];
    setNewStaffMember({ ...newStaffMember, skills: updatedSkills });
  };

  const toggleAvailability = (day, slot) => {
    setNewStaffMember({
      ...newStaffMember,
      availability: {
        ...newStaffMember.availability,
        [day]: {
          ...newStaffMember.availability[day],
          [slot]: !newStaffMember.availability[day][slot]
        }
      }
    });
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
            <button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Add Staff Member
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Staff
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Roles</option>
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Staff Form */}
          {isAddingNew && (
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Add New Staff Member</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newStaffMember.name}
                      onChange={(e) => setNewStaffMember({ ...newStaffMember, name: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newStaffMember.email}
                      onChange={(e) => setNewStaffMember({ ...newStaffMember, email: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={newStaffMember.role}
                      onChange={(e) => setNewStaffMember({ ...newStaffMember, role: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills
                    </label>
                    <div className="space-y-2">
                      {skills.map(skill => (
                        <label key={skill} className="inline-flex items-center mr-4">
                          <input
                            type="checkbox"
                            checked={newStaffMember.skills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <div className="grid grid-cols-8 gap-4">
                      <div></div> {/* Empty cell for alignment */}
                      {days.map(day => (
                        <div key={day} className="text-center">
                          <span className="text-sm font-medium text-gray-700">
                            {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                          </span>
                        </div>
                      ))}
                      {timeSlots.map(slot => (
                        <React.Fragment key={slot}>
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-700">
                              {slot.charAt(0).toUpperCase() + slot.slice(1)}
                            </span>
                          </div>
                          {days.map(day => (
                            <div key={`${day}-${slot}`} className="text-center">
                              <input
                                type="checkbox"
                                checked={newStaffMember.availability[day][slot]}
                                onChange={() => toggleAvailability(day, slot)}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Certifications
                    </label>
                    <CertificationUpload
                      staffMember={newStaffMember}
                      onUpdateCertifications={(certs) => 
                        setNewStaffMember({ ...newStaffMember, certifications: certs })
                      }
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNew}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add Staff Member
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Staff List */}
          <div className="bg-white shadow rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Member
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <ChartBarIcon className="h-5 w-5 text-gray-400" />
                            <span>{member.metrics.jobsCompleted} jobs</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.metrics.rating}/5 rating
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.metrics.onTimeRate}% on time
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement; 
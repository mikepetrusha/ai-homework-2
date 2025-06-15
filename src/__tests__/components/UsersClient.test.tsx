import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersClient from '@/components/UsersClient';
import { User } from '@/types/user';

// Mock UserTable component
jest.mock('@/components/UserTable', () => {
  return function MockUserTable({ users, onDeleteUser }: { 
    users: User[]; 
    onDeleteUser: (id: number) => void 
  }) {
    return (
      <div data-testid="mock-user-table">
        <div>User Count: {users.length}</div>
        <button 
          data-testid="delete-user-button" 
          onClick={() => onDeleteUser(users[0]?.id || 0)}
        >
          Delete User
        </button>
      </div>
    );
  };
});

// Mock data for testing
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 4B',
      city: 'Anytown',
      zipcode: '12345',
      geo: {
        lat: '40.7128',
        lng: '-74.0060'
      }
    },
    phone: '555-1234',
    website: 'johndoe.com',
    company: {
      name: 'ABC Corp',
      catchPhrase: 'Making the world better',
      bs: 'innovative solutions'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    address: {
      street: '456 Oak Ave',
      suite: 'Suite 200',
      city: 'Somewhere',
      zipcode: '67890',
      geo: {
        lat: '34.0522',
        lng: '-118.2437'
      }
    },
    phone: '555-5678',
    website: 'janesmith.com',
    company: {
      name: 'XYZ Inc',
      catchPhrase: 'Excellence in everything',
      bs: 'cutting-edge technology'
    }
  }
];

describe('UsersClient Component', () => {
  test('renders UserTable with initial users', () => {
    render(<UsersClient initialUsers={mockUsers} />);
    
    // Check if UserTable is rendered with the correct user count
    expect(screen.getByTestId('mock-user-table')).toBeInTheDocument();
    expect(screen.getByText(`User Count: ${mockUsers.length}`)).toBeInTheDocument();
  });

  test('handles user deletion correctly', () => {
    render(<UsersClient initialUsers={mockUsers} />);
    
    // Initial user count should be 2
    expect(screen.getByText('User Count: 2')).toBeInTheDocument();
    
    // Click delete button
    fireEvent.click(screen.getByTestId('delete-user-button'));
    
    // User count should now be 1 (after deletion)
    expect(screen.getByText('User Count: 1')).toBeInTheDocument();
  });

  test('renders empty state when no users are provided', () => {
    render(<UsersClient initialUsers={[]} />);
    
    // Check if UserTable is rendered with zero users
    expect(screen.getByTestId('mock-user-table')).toBeInTheDocument();
    expect(screen.getByText('User Count: 0')).toBeInTheDocument();
  });
});

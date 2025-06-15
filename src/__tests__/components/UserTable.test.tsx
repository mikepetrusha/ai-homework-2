import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserTable from '@/components/UserTable';
import { User } from '@/types/user';

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

// Mock functions
const mockOnDeleteUser = jest.fn();

// Mock timer for animation testing
jest.useFakeTimers();

describe('UserTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders user table with correct number of users', () => {
    render(<UserTable users={mockUsers} onDeleteUser={mockOnDeleteUser} />);
    
    // Check if table headers are rendered using regex for case-insensitive matching
    expect(screen.getByText(/name\s*\/\s*email/i)).toBeInTheDocument();
    expect(screen.getByText(/address/i)).toBeInTheDocument();
    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/website/i)).toBeInTheDocument();
    expect(screen.getByText(/company/i)).toBeInTheDocument();
    
    // Check if user rows are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('calls onDeleteUser when delete button is clicked', () => {
    render(<UserTable users={mockUsers} onDeleteUser={mockOnDeleteUser} />);
    
    // Find delete buttons
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(mockUsers.length);
    
    // Click the first delete button
    fireEvent.click(deleteButtons[0]);
    
    // Fast-forward timers to trigger the callback after animation
    jest.advanceTimersByTime(500);
    
    // Check if onDeleteUser was called with the correct user ID
    expect(mockOnDeleteUser).toHaveBeenCalledWith(mockUsers[0].id);
  });

  test('opens modal when user row is clicked', () => {
    render(<UserTable users={mockUsers} onDeleteUser={mockOnDeleteUser} />);
    
    // Find and click the first user row
    const userRow = screen.getByText(mockUsers[0].name);
    fireEvent.click(userRow);
    
    // Check if modal is opened
    // We'll just verify that the modal content is in the document
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  test('renders website as a clickable link with blue text', () => {
    render(<UserTable users={mockUsers} onDeleteUser={mockOnDeleteUser} />);
    
    // Check if website links are rendered correctly
    const websiteLinks = screen.getAllByRole('link');
    expect(websiteLinks).toHaveLength(mockUsers.length);
    
    // Check first website link
    expect(websiteLinks[0]).toHaveAttribute('href', `https://${mockUsers[0].website}`);
    expect(websiteLinks[0]).toHaveAttribute('target', '_blank');
    expect(websiteLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check if it has the correct text content
    expect(websiteLinks[0].textContent).toBe(mockUsers[0].website);
  });

  test('renders empty state when no users are provided', () => {
    render(<UserTable users={[]} onDeleteUser={mockOnDeleteUser} />);
    
    // Check if table headers are still rendered
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    
    // Check if no user rows are rendered
    const tableBody = document.querySelector('tbody');
    expect(tableBody?.children.length).toBe(0);
  });
});

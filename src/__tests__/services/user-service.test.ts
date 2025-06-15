import { fetchUsers, fetchUserById } from '@/services/user-service';
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

describe('User Service', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.resetAllMocks();
    
    // Mock the global fetch function
    (global.fetch as jest.Mock).mockClear();
  });

  describe('fetchUsers', () => {
    test('fetches users successfully', async () => {
      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      // Call the function
      const result = await fetchUsers();

      // Check if fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users',
        expect.objectContaining({
          next: { revalidate: 3600 },
        })
      );

      // Check if the result is correct
      expect(result).toEqual(mockUsers);
      expect(result.length).toBe(2);
    });

    test('handles fetch error', async () => {
      // Mock the fetch response to simulate an error
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      // Expect the function to throw an error
      await expect(fetchUsers()).rejects.toThrow('Failed to fetch users: 500');

      // Check if fetch was called
      expect(global.fetch).toHaveBeenCalled();
    });

    test('handles network error', async () => {
      // Mock the fetch to throw a network error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Expect the function to throw the error
      await expect(fetchUsers()).rejects.toThrow('Network error');

      // Check if fetch was called
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('fetchUserById', () => {
    test('fetches a user by ID successfully', async () => {
      const userId = 1;
      const mockUser = mockUsers[0];

      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      // Call the function
      const result = await fetchUserById(userId);

      // Check if fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        expect.objectContaining({
          next: { revalidate: 3600 },
        })
      );

      // Check if the result is correct
      expect(result).toEqual(mockUser);
      expect(result.id).toBe(userId);
    });

    test('handles fetch error for user by ID', async () => {
      const userId = 999; // Non-existent user ID

      // Mock the fetch response to simulate an error
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      // Expect the function to throw an error
      await expect(fetchUserById(userId)).rejects.toThrow('Failed to fetch user: 404');

      // Check if fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        expect.anything()
      );
    });
  });
});

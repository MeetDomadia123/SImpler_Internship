import React from 'react';
import UserCard from '../Components/UserCard.jsx';

const users = [
  { name: 'Meet', email: 'meet.j@example.com' },
  { name: 'Bob will', email: 'bob.w@example.com' },
  { name: 'Charlie black', email: 'charlie.b@example.com' },
];

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Users</h1>
      <p className="text-lg text-gray-600 mb-12">Meet some of our amazing community members.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, index) => (
          <UserCard key={index} name={user.name} email={user.email} />
        ))}
      </div>
    </div>
  );
};

export default Home;
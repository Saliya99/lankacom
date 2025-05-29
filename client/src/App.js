import React, { useSate, useEffect } from 'react'
// import userList
// import userForm
import './App.css'

function App() {
  const [users, setUsers] = useSate([]);
  const [loading, setLoading] = useSate([false]);
  const [errors, setError] = useSate('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);

    } catch {
      setError("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  };

  const addUser = async (user) => {

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)

      });

      if (!res.ok) throw new Error('Error adding user');
      const newUser = await res.json();
      setError([...user, newUser])

    } catch {
      setError("Error Adding Users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container'>
      <h1>Technical Interview LankaCom</h1>
      <userForm onAdd={addUser} />
      {loading ? <p> Loading ..</p> : <userList users={users} />}
      {error && <p className='error'>{error}</p>}
    </div>
  );
}

export default App;

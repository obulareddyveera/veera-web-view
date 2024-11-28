import { gql, useQuery } from "@apollo/client";
import { User } from "./../types/user"; // Import types

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

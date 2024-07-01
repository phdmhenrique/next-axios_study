// src/pages/profile.tsx
import withAuth from "@/components/withAuth";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <h1>Profile Page</h1>
        {user && (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
            {user.address && (
              <p>
                <strong>Address:</strong>{" "}
                {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
              </p>
            )}
            <p>
              <strong>Company:</strong> {user.company.name}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default withAuth(Profile);

/* eslint-disable @next/next/no-img-element */

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  company?: {
    title?: string;
    name?: string;
    department?: string;
    address?: {
      addressLine?: string | null;
      city?: string;
      state?: string;
      stateCode?: string;
      postalCode?: string;
    };
  };
};

type UserProps = {
  user: UserType;
};

export default function User({ user }: UserProps) {
  return (
    <div className="card">
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-16 h-16 rounded-full mb-2 object-cover"
        height={20}
        width={20}
      />
      <div className="font-bold text-lg">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-sm text-gray-500 mb-1">{user.email}</div>
      {user.company?.title && (
        <div className="text-sm text-gray-600 italic">{user.company.title}</div>
      )}
    </div>
  );
}

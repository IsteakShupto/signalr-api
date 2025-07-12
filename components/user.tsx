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

      <div>
        <button
          className="btn btn-accent w-fit mt-2.5"
          onClick={() => {
            const modal = document.getElementById(
              "my_modal"
            ) as HTMLDialogElement;
            modal.showModal();
          }}
        >
          Details
        </button>

        <dialog id="my_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              {user.firstName} {user.lastName}
            </h3>

            <div className="flex items-start gap-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-2 border-accent"
              />
              <div className="flex flex-col text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>

                {user.company?.title && (
                  <p>
                    <span className="font-semibold">Job Title:</span>{" "}
                    {user.company.title}
                  </p>
                )}
                {user.company?.name && (
                  <p>
                    <span className="font-semibold">Company:</span>{" "}
                    {user.company.name}
                  </p>
                )}
                {user.company?.department && (
                  <p>
                    <span className="font-semibold">Department:</span>{" "}
                    {user.company.department}
                  </p>
                )}

                {user.company?.address && (
                  <div>
                    <p className="font-semibold mt-2">Address:</p>
                    <p>
                      {user.company.address.addressLine || ""}
                      {` ${user.company.address.city || ""}, ${
                        user.company.address.state || ""
                      }`}
                    </p>
                    <p>
                      {user.company.address.stateCode && (
                        <span>{user.company.address.stateCode}</span>
                      )}
                      {user.company.address.postalCode && (
                        <span>{` - ${user.company.address.postalCode}`}</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>

          {/* Enable close on outside click */}
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}

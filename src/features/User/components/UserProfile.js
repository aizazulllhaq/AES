import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";

export function UserProfile() {
  const user = useSelector(selectLoggedInUser);

  return (
    <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl tracking-light text-gray-900  my-5">
          Name : {user.name ? user.name : "New User"}
        </h1>
        <h3 className="text-xl tracking-light text-red-800 font-bold my-5">
          Email Address : {user.email}
          <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
      {user.addresses.map((address) => (
        <div className="flex justify-between gap-x-6 py-5 border border-solid  border-gray-200 px-5 my-1">
          <div className="flex min-w-0 gap-x-4 border-gray-500">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {address.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.street}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
            <p className="text-sm leading-6 text-gray-500">{address.city}</p>
          </div>
        </div>
      ))}
        </h3>
      </div>

      
    </div>
  );
}

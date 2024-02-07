import { useState, useEffect } from "react";
import { supabase } from "./Client";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("Users")
        .select("FristName", "LastName", "Address")
        .eq("id", user.id)
        .single();

      if (data) {
        setFname(data.FristName);
        setLname(data.LastName);
        setAddress(data.Address);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // to see if user is logged in or not
      const user = supabase.auth.getUser();
      const updates = {
        id: user.id,
        fname,
        lname,
        address,
      };
      let { error } = await supabase
        .from("Users")
        .upsert(updates, { returning: "minimal" });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-screen py-5 px-3 bg-black items-center">
      <div class="bg-white">
        <h4 class="flex justify-center p-3 text-[22px]">Edit Account Info</h4>
      </div>
      <form onSubmit={updateProfile} className="space-y-4 md:space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <input
            name="fname"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
          ></input>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <input
            name="lname"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
          ></input>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address
          </label>
          <input
            name="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default Account;

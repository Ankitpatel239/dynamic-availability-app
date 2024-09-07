"use client";
import React, { useEffect, useState } from "react";

const ProfileSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [changeButton, setChangeButton] = useState('save changes');
 useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data
        const response = await fetch('/api/dashboard/settings');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const user = await response.json();
        setFormData({
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUser();
  }, []);


  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  // Handle change in form inputs
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    validateInput(id, value);
  };

  // Validate input fields
  const validateInput = (id: string, value: string) => {
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "This field cannot be empty",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const { name, email } = formData;
    let isValid = true;
    if (name.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name cannot be empty",
      }));
      isValid = false;
    }
    if (email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email cannot be empty",
      }));
      isValid = false;
    }

    if (isValid) {
      try {
        // Log the form data
        console.log('Form submitted:', formData);
  
        // Perform form submission logic here
        // For example, send a PUT request to update the user's name
        const response = await fetch('/api/dashboard/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: formData.email, 
            name: formData.name,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
  
        const result = await response.json();
        console.log('Update successful:', result);
        setChangeButton('saved');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      
      console.log('Form data is invalid.');
      
    }
  };

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
   console.log('Form submitted:', currentPassword, newPassword);
    try {
      const response = await fetch('/api/dashboard/settings/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Password updated successfully");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  const handleDelete = async () => {
    console.log(document.cookie.split('token=')[1]?.split(';')[0])
    try {
      const response = await fetch('/api/dashboard/settings/deleteAccount', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          },
      });

      const data = await response.json();

      if (response.ok) {
        alert('Your account has been successfully deleted.');
        window.location.href = '/login'; // Redirect to login page or home page
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting your account.');
    }
  };
  return (
    <div className="grid gap-8">
      {/* Profile Information */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Profile Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Update your name only.
          </p>
        </div>
        <div className="p-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`flex h-10 w-full rounded-md border ${
                  errors.name ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`flex h-10 w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                id="email"
                type="email"
                value={formData.email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Save Changes Button */}
            <div className="flex items-center p-6">
              <button
                type="submit"
                className="inline-flex bg-white font-bold items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                disabled={!!errors.name || !!errors.email}
              >
                {changeButton}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          Change Password
        </h3>
        <p className="text-sm text-muted-foreground">
          Update your account password.
        </p>
      </div>
      <div className="p-6">
        <form className="grid gap-4" onSubmit={handleChangePassword}>
          {/* Current Password */}
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="current-password">
              Current Password
            </label>
            <input
              className=" flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          {/* New Password */}
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="new-password">
              New Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password */}
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="flex items-center p-6">
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-white border"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>

      {/* Delete Account */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
          Delete Account
        </h3>
        <p className="text-sm text-muted-foreground">
          Permanently delete your account and all associated data.
        </p>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground">
          Deleting your account is a permanent action and cannot be undone.
          All your data, including your profile information, settings, and any
          content you have created, will be permanently removed from our servers.
        </p>
      </div>
      <div className="flex items-center p-6">
        <button
          onClick={handleDelete}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 bg-blue text-white text-bold"
         style={{backgroundColor:'red',fontWeight:'bolder'}}>
          Delete Account
        </button>
      </div>
    </div>

      {/* Other Settings */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Other Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences and privacy options.
          </p>
        </div>
        <div className="p-6">
          <form className="grid gap-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-muted-foreground text-sm">
                  Receive email updates about your account and activities.
                </p>
              </div>
              <button
                type="button"
                role="checkbox"
                aria-checked="false"
                value="on"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                id="email-notifications"
              ></button>
              <input
                aria-hidden="true"
                type="checkbox"
                value="on"
                style={{
                  transform: "translateX(-100%)",
                  position: "absolute",
                  pointerEvents: "none",
                  opacity: 0,
                  margin: 0,
                  width: 16,
                  height: 16,
                }}
              />
            </div>
            {/* Privacy */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Privacy</p>
                <p className="text-muted-foreground text-sm">
                  Control who can see your profile and activities.
                </p>
              </div>
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:rg:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="block truncate">Public</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

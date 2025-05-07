"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Upload } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserOrders } from "@/lib/orders"
import { updateUserProfile, uploadProfilePicture } from "@/lib/auth"
import OrderList from "@/components/order-list"

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/profile")
      return
    }

    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
    }))

    if (user.profileImageUrl) {
      setImagePreview(user.profileImageUrl)
    }

    const fetchOrders = async () => {
      try {
        setIsLoadingOrders(true)
        const userOrders = await getUserOrders(user.id)
        setOrders(userOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoadingOrders(false)
      }
    }

    fetchOrders()
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const togglePasswordVisibility = (field: keyof typeof passwordVisible) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      if (profileImage) {
        setImagePreview((await uploadProfilePicture(user?.id || "", profileImage)))
        // Optionally store this URL in your DB as part of `updateUserProfile`
      }

      const updatedUser = await updateUserProfile({
        userId: user?.id || "",
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })

      setUser(updatedUser)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      console.error("Profile update error:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>

            {/* Profile image upload */}
            <div className="mb-6 flex items-center space-x-4">
              <img
                src={imagePreview || "/default-avatar.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <Label htmlFor="profileImage">Change Profile Picture</Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-2">Change Password</h3>

              {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                <div className="space-y-2" key={field}>
                  <Label htmlFor={field}>
                    {field === "currentPassword"
                      ? "Current Password"
                      : field === "newPassword"
                      ? "New Password"
                      : "Confirm New Password"}
                  </Label>
                  <div className="relative">
                    <Input
                      id={field}
                      name={field}
                      type={passwordVisible[field as keyof typeof passwordVisible] ? "text" : "password"}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      minLength={field !== "currentPassword" ? 8 : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field as keyof typeof passwordVisible)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    >
                      {passwordVisible[field as keyof typeof passwordVisible] ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <Button type="submit" className="mt-4" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            {isLoadingOrders ? (
              <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4">Loading your orders...</p>
              </div>
            ) : orders.length > 0 ? (
              <OrderList orders={orders} />
            ) : (
              <div className="py-8 text-center">
                <p>You haven&apos;t placed any orders yet.</p>
                <Button className="mt-4" onClick={() => router.push("/books")}>
                  Browse Books
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

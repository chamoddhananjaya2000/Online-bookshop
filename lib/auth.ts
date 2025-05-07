import type { User } from "@/lib/types"

interface LoginParams {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterParams {
  name: string
  email: string
  password: string
}

interface UpdateProfileParams {
  userId: string
  name: string
  email: string
  currentPassword?: string
  newPassword?: string
}

export async function loginUser(params: LoginParams): Promise<User> {
  const { email, password } = params

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Login failed")
  }

  const data = await response.json()
  return data.user
}

export async function registerUser(params: RegisterParams): Promise<User> {
  const { name, email, password } = params

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Registration failed")
  }

  const data = await response.json()
  return data.user
}

export async function updateUserProfile(params: UpdateProfileParams): Promise<User> {
  const { userId, name, email, currentPassword, newPassword } = params

  // Get token from storage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch("/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, name, email, currentPassword, newPassword }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Profile update failed")
  }

  const data = await response.json()
  return data.user
}

export async function logoutUser(): Promise<void> {
  // For client-side logout, we just clear the token and user data
  // This is handled in the auth context
}

// Add the uploadProfilePicture function
export async function uploadProfilePicture(userId: string, file: File): Promise<string> {
  // Get token from storage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  const formData = new FormData()
  formData.append("userId", userId)
  formData.append("file", file)

  const response = await fetch("/api/auth/upload-profile-picture", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to upload profile picture")
  }

  const data = await response.json()
  return data.imageUrl // Assuming the API returns the uploaded image URL
}
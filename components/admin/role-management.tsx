"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

interface RoleManagementProps {
  className?: string;
}

export default function RoleManagement({ className }: RoleManagementProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) {
      toast.error("Please provide both email and role");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update role");
      }

      toast.success("Role updated successfully");
      setEmail("");
      setRole("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Update User Role</h2>
      <form onSubmit={handleUpdateRole} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Select
            value={role}
            onValueChange={setRole}
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Updating..." : "Update Role"}
        </Button>
      </form>
    </Card>
  );
}
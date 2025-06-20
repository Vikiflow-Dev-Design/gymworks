"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  createTestPlan,
  registerTestMembership,
  triggerExpirationCheck,
  renewTestMembership,
} from "@/app/actions/test-plan";
import { RefreshCw } from "lucide-react";
import { getUserMemberships } from "@/app/actions/membership";
import { useUser } from "@clerk/nextjs";
import { formatNaira } from "@/lib/utils";

interface Plan {
  _id: string;
  name: string;
  duration: string;
  price: number;
  features: string[];
}

interface Membership {
  _id: string;
  userId: string;
  planId: string;
  planName: string;
  price: number;
  features: string[];
  startDate: string;
  endDate: string;
  status: string;
  paymentStatus: string;
  expiresIn?: string;
}

export default function TestExpirationPage() {
  const { user, isLoaded } = useUser();
  const [testPlan, setTestPlan] = useState<Plan | null>(null);
  const [testMembership, setTestMembership] = useState<Membership | null>(null);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState({
    createPlan: false,
    registerMembership: false,
    checkExpiration: false,
    fetchMemberships: false,
    renewMembership: false,
  });
  const [renewingMembershipId, setRenewingMembershipId] = useState<
    string | null
  >(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Create the test plan
  const handleCreateTestPlan = async () => {
    setLoading((prev) => ({ ...prev, createPlan: true }));
    try {
      const result = await createTestPlan();
      if (result.success) {
        setTestPlan(result.plan);
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to create test plan");
    } finally {
      setLoading((prev) => ({ ...prev, createPlan: false }));
    }
  };

  // Register or renew a membership with the test plan
  const handleRegisterTestMembership = async () => {
    if (!testPlan) {
      toast.error("Please create a test plan first");
      return;
    }

    // Don't allow renewing active memberships
    if (testMembership && testMembership.status === "active") {
      toast.error(
        "Cannot renew an active membership. Wait for it to expire first."
      );
      return;
    }

    setLoading((prev) => ({ ...prev, registerMembership: true }));
    try {
      // If we have an expired test membership, renew it instead of creating a new one
      let result;
      if (testMembership && testMembership.status === "expired") {
        result = await renewTestMembership(testMembership._id);
      } else {
        result = await registerTestMembership(testPlan._id);
      }

      if (result.success) {
        setTestMembership(result.membership);
        toast.success(result.message);
        // Refresh memberships
        fetchMemberships();
        // Start countdown
        if (result.membership.endDate) {
          const endTime = new Date(result.membership.endDate).getTime();
          setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to process test membership");
    } finally {
      setLoading((prev) => ({ ...prev, registerMembership: false }));
    }
  };

  // Trigger the expiration check
  const handleTriggerExpirationCheck = async () => {
    setLoading((prev) => ({ ...prev, checkExpiration: true }));
    try {
      const result = await triggerExpirationCheck();
      if (result.success) {
        toast.success(result.message);
        // Refresh memberships after a short delay
        setTimeout(() => {
          fetchMemberships();
        }, 1000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to trigger expiration check");
    } finally {
      setLoading((prev) => ({ ...prev, checkExpiration: false }));
    }
  };

  // Renew an expired test membership
  const handleRenewTestMembership = async (membershipId: string) => {
    setRenewingMembershipId(membershipId);
    setLoading((prev) => ({ ...prev, renewMembership: true }));
    try {
      const result = await renewTestMembership(membershipId);
      if (result.success) {
        toast.success(result.message);
        // Update the test membership if it's the one we're displaying
        if (testMembership && testMembership._id === membershipId) {
          setTestMembership(result.membership);
          // Start countdown
          if (result.membership.endDate) {
            const endTime = new Date(result.membership.endDate).getTime();
            setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
          }
        }
        // Refresh memberships
        fetchMemberships();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to renew test membership");
    } finally {
      setLoading((prev) => ({ ...prev, renewMembership: false }));
      setRenewingMembershipId(null);
    }
  };

  // Fetch user memberships
  const fetchMemberships = async () => {
    if (!user?.id) return;

    setLoading((prev) => ({ ...prev, fetchMemberships: true }));
    try {
      const userMemberships = await getUserMemberships(user.id);
      setMemberships(userMemberships);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      setLoading((prev) => ({ ...prev, fetchMemberships: false }));
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, refreshKey]);

  // Fetch memberships on load and when user changes
  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchMemberships().then(() => {
        // Check if we already have a test plan
        createTestPlan().then((result) => {
          if (result.success) {
            setTestPlan(result.plan);
          }
        });
      });
    }
  }, [isLoaded, user, refreshKey]);

  // Find and set the test membership when memberships change
  useEffect(() => {
    if (memberships.length > 0 && testPlan) {
      const testMembership = memberships.find(
        (m) => m.planName === "1-Minute Test Plan"
      );
      if (testMembership) {
        setTestMembership(testMembership);

        // Start countdown if the membership is active
        if (testMembership.status === "active" && testMembership.endDate) {
          const endTime = new Date(testMembership.endDate).getTime();
          setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
        } else {
          setTimeLeft(null);
        }
      }
    }
  }, [memberships, testPlan]);

  // Format time left
  const formatTimeLeft = (seconds: number | null) => {
    if (seconds === null) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto pt-24 pb-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Test Membership Expiration</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        This page allows you to test the membership expiration system by
        creating a test plan that expires in 1 minute.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Step 1: Create Test Plan
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Create a test plan that will be used for testing the expiration
            system.
          </p>
          <Button
            onClick={handleCreateTestPlan}
            disabled={loading.createPlan || !!testPlan}
            className="w-full"
          >
            {loading.createPlan
              ? "Creating..."
              : testPlan
              ? "Test Plan Created"
              : "Create Test Plan"}
          </Button>

          {testPlan && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h3 className="font-medium">{testPlan.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Price: {formatNaira(testPlan.price)}
              </p>
              <ul className="mt-2 text-sm">
                {testPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Step 2: Register or Renew Test Membership
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Register or renew a membership with the test plan. This membership
            will expire in 1 minute.
          </p>

          {/* Show test membership details if it exists */}
          {testMembership && (
            <div className="mb-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                <h3 className="font-medium">{testMembership.planName}</h3>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      testMembership.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {testMembership.status}
                  </span>
                </p>
                <p className="text-sm">
                  Payment Status:{" "}
                  <span
                    className={`font-medium ${
                      testMembership.paymentStatus === "paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {testMembership.paymentStatus}
                  </span>
                </p>
                {testMembership.status === "active" && (
                  <p className="text-sm">
                    Expires in:{" "}
                    {timeLeft !== null ? formatTimeLeft(timeLeft) : "N/A"}
                  </p>
                )}
              </div>

              {timeLeft === 0 && (
                <div className="mt-4">
                  <p className="text-sm text-amber-500 mb-2">
                    The membership has reached its expiration time. Trigger the
                    expiration check to update its status.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Register or Renew button */}
          <Button
            onClick={handleRegisterTestMembership}
            disabled={
              loading.registerMembership ||
              !testPlan ||
              (testMembership && testMembership.status === "active")
            }
            className="w-full"
          >
            {loading.registerMembership
              ? "Processing..."
              : testMembership
              ? testMembership.status === "active"
                ? "Membership Active"
                : "Renew Test Membership"
              : "Register Test Membership"}
          </Button>

          {testMembership && testMembership.status === "active" && (
            <p className="mt-2 text-xs text-gray-500 text-center">
              You cannot renew an active membership. Wait for it to expire
              first.
            </p>
          )}
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Step 3: Trigger Expiration Check
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          After the 1 minute has passed, trigger the expiration check to update
          the membership status.
        </p>
        <Button
          onClick={handleTriggerExpirationCheck}
          disabled={loading.checkExpiration}
          className="w-full"
        >
          {loading.checkExpiration ? "Checking..." : "Trigger Expiration Check"}
        </Button>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Memberships</h2>
          <Button
            variant="outline"
            onClick={() => {
              fetchMemberships();
              setRefreshKey((prev) => prev + 1);
            }}
            disabled={loading.fetchMemberships}
          >
            {loading.fetchMemberships ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {memberships.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No memberships found.
          </p>
        ) : (
          <div className="space-y-4">
            {memberships.map((membership) => (
              <div key={membership._id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{membership.planName}</h3>
                  {membership.status === "expired" &&
                    membership.planName === "1-Minute Test Plan" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                        onClick={() =>
                          handleRenewTestMembership(membership._id)
                        }
                        disabled={
                          loading.renewMembership &&
                          renewingMembershipId === membership._id
                        }
                      >
                        {loading.renewMembership &&
                        renewingMembershipId === membership._id ? (
                          <span className="flex items-center">
                            <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                            Renewing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <RefreshCw className="w-3 h-3 mr-2" />
                            Renew
                          </span>
                        )}
                      </Button>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <p>
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        membership.status === "active"
                          ? "text-green-500"
                          : membership.status === "expired"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {membership.status}
                    </span>
                  </p>
                  <p>
                    Payment:{" "}
                    <span
                      className={`font-medium ${
                        membership.paymentStatus === "paid"
                          ? "text-green-500"
                          : membership.paymentStatus === "expired"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {membership.paymentStatus}
                    </span>
                  </p>
                  <p>
                    Start: {new Date(membership.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    End: {new Date(membership.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { formatNaira } from "@/lib/utils";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "@/app/actions/plans";

type Plan = {
  _id: string;
  name: string;
  duration: "month" | "3 months" | "6 months" | "year";
  price: number;
  features: string[];
  popular: boolean;
  status: "active" | "inactive";
};

export default function PlansManagement() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    duration: "month",
    price: 0,
    features: [""],
    popular: false,
  });
  const [selectedDuration, setSelectedDuration] = useState<string>("month");

  useEffect(() => {
    fetchPlans();
  }, [selectedDuration]);

  const fetchPlans = async () => {
    try {
      const plansData = await getPlans();
      const durationOrder = { month: 1, "3 months": 2, "6 months": 3, year: 4 };
      const filteredPlans = plansData.filter(
        (plan) => plan.duration === selectedDuration
      );
      const sortedPlans = filteredPlans.sort(
        (a, b) => durationOrder[a.duration] - durationOrder[b.duration]
      );
      setPlans(sortedPlans);
    } catch (error) {
      toast.error("Failed to fetch plans");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await updatePlan(editingPlan._id, {
          ...formData,
          features: formData.features.filter((f) => f.trim() !== ""),
        });
        toast.success("Plan updated successfully");
      } else {
        await createPlan({
          ...formData,
          features: formData.features.filter((f) => f.trim() !== ""),
        });
        toast.success("Plan created successfully");
      }
      setIsModalOpen(false);
      setEditingPlan(null);
      resetForm();
      fetchPlans();
    } catch (error) {
      toast.error(
        editingPlan ? "Failed to update plan" : "Failed to create plan"
      );
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      duration: plan.duration,
      price: plan.price,
      features: plan.features,
      popular: plan.popular,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (planId: string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePlan(planId);
        toast.success("Plan deleted successfully");
        fetchPlans();
      } catch (error) {
        toast.error("Failed to delete plan");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      duration: "month",
      price: 0,
      features: [""],
      popular: false,
    });
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 sm:mb-12">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/70 mb-4">
                Plans Management
              </h1>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {["month", "3 months", "6 months", "year"].map((duration) => (
                  <Button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    variant={
                      selectedDuration === duration ? "default" : "outline"
                    }
                    className={`flex-1 sm:flex-none transition-all duration-300 ${
                      selectedDuration === duration
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                    }`}
                  >
                    {duration.charAt(0).toUpperCase() + duration.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setEditingPlan(null);
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
            >
              <Plus className="w-5 h-5 mr-2" /> Add New Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 sm:p-8 relative hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 dark:hover:border-primary/20 overflow-hidden group">
                  {plan.popular && (
                    <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-white text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                        {plan.name}
                      </h3>
                      <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                        {formatNaira(plan.price)}
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-2">
                          /{plan.duration}
                        </span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                        className="hover:bg-primary/10 rounded-full"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(plan._id)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary text-lg">•</span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-2xl w-full max-w-md relative shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingPlan(null);
                    resetForm();
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {editingPlan ? "Edit Plan" : "Create New Plan"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Plan Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-medium">
                      Duration
                    </Label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      required
                    >
                      <option value="month">Monthly</option>
                      <option value="3 months">3 Months</option>
                      <option value="6 months">6 Months</option>
                      <option value="year">Yearly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Features</Label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                          placeholder="Enter feature"
                          className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFeature}
                      className="mt-2 w-full border-dashed border-2 hover:border-primary transition-colors duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Feature
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="popular"
                      name="popular"
                      checked={formData.popular}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="popular" className="text-sm font-medium">
                      Mark as Popular
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg mt-8"
                  >
                    {editingPlan ? "Update Plan" : "Create Plan"}
                  </Button>
                </form>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

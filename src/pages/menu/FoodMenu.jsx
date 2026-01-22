// src/pages/menu/FoodMenu.jsx
import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { useAuth } from "@/features/auth/useAuth";
import { toast } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FoodMenu() {
  const { user } = useAuth();
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get("/menu");
        const data = res.data.data || [];
        setSections(data);
        if (data.length > 0) setSelectedSectionId(data[0]._id);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load menu");
      }
    };
    fetchMenu();
  }, []);

  const selectedSection = sections.find((s) => s._id === selectedSectionId);
  const selectedItem = selectedSection?.items.find(
    (i) => i._id === selectedItemId
  );

  const toggleChoice = (optionId, choiceId) => {
    setSelectedChoices((prev) => {
      const current = prev[optionId] || [];
      return {
        ...prev,
        [optionId]: current.includes(choiceId)
          ? current.filter((id) => id !== choiceId)
          : [...current, choiceId],
      };
    });
  };

  const handleOrderChange = (e) =>
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    if (!selectedItem) return toast.error("Please select an item");
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address)
      return toast.error("Please fill all customer details");

    const payload = {
      items: [
        {
          item: selectedItem._id,
          price: selectedItem.price || 10,
          quantity: 1,
          selectedOptions: selectedItem.options
            ?.map((opt) => {
              const choices = selectedChoices[opt._id] || [];
              return choices.map((choiceId) => ({
                option: opt._id,
                choice: choiceId,
              }));
            })
            .flat(),
        },
      ],
      ...customerInfo,
      sessionKey: null,
    };

    try {
      await api.post("/orders", payload);
      toast.success("Order placed successfully");
      setSelectedItemId(null);
      setSelectedChoices({});
      setCustomerInfo({ name: "", phone: "", address: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 min-h-screen bg-gray-50">
      {/* Sections */}
      <Card className="lg:w-1/4 h-full overflow-auto">
        <CardHeader>
          <CardTitle>Sections</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {sections.map((section) => (
            <Button
              key={section._id}
              variant={
                selectedSectionId === section._id ? "default" : "outline"
              }
              className="w-full text-left"
              onClick={() => {
                setSelectedSectionId(section._id);
                setSelectedItemId(null);
                setSelectedChoices({});
              }}
            >
              {section.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Items */}
      <Card className="lg:w-1/2 h-full overflow-auto flex flex-col gap-3">
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {selectedSection?.items.map((item) => (
            <Card
              key={item._id}
              className={`cursor-pointer border transition-all ${
                selectedItemId === item._id
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedItemId(item._id)}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-t"
                />
              )}
              <CardContent className="flex justify-between items-center">
                <span className="font-semibold">{item.name}</span>
                <span className="text-gray-500">${item.price || 10}</span>
              </CardContent>

              {/* Options */}
              {selectedItemId === item._id &&
                item.options?.map((opt) => (
                  <div key={opt._id} className="px-4 pb-2">
                    <p className="font-medium">{opt.name}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {opt.choices.map((choice) => (
                        <Button
                          key={choice._id}
                          variant={
                            selectedChoices[opt._id]?.includes(choice._id)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => toggleChoice(opt._id, choice._id)}
                        >
                          {choice.name} (+${choice.price || 0})
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Order Panel */}
      <Card className="lg:w-1/4 w-full h-full flex flex-col justify-between sticky top-0">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {selectedItem ? (
            <>
              <div className="flex justify-between font-semibold">
                <span>Item:</span>
                <span>{selectedItem.name}</span>
              </div>

              {selectedItem.options?.map((opt) => (
                <div key={opt._id}>
                  <div className="font-medium">{opt.name}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {opt.choices.map((choice) => (
                      <span
                        key={choice._id}
                        className={`px-2 py-1 rounded-md border ${
                          selectedChoices[opt._id]?.includes(choice._id)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        }`}
                      >
                        {choice.name} (+${choice.price || 0})
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <Input
                placeholder="Name"
                name="name"
                value={customerInfo.name}
                onChange={handleOrderChange}
              />
              <Input
                placeholder="Phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleOrderChange}
              />
              <Input
                placeholder="Address"
                name="address"
                value={customerInfo.address}
                onChange={handleOrderChange}
              />
              <Button className="mt-2 w-full" onClick={handlePlaceOrder}>
                Confirm Order
              </Button>
            </>
          ) : (
            <p className="text-gray-500 text-center">
              Select an item to place an order
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "../ui/text-effect";
import { Drawer } from "vaul";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const BecomeMember = () => {
  const [membershipCategory, setMembershipCategory] = useState("");
  const [businessType, setBusinessType] = useState("");

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button
          size="lg"
          className="rounded-xl px-5 text-base relative overflow-hidden group"
        >
          <span className="relative z-10">
            <TextEffect preset="scale" per="word">
              Become a Member
            </TextEffect>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-yellow-500/40 to-yellow-400/30 opacity-100 transition-opacity duration-300 -skew-x-12" />
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        
        {/* Drawer with scroll fix */}
        <Drawer.Content className="bg-white z-50 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          {/* Drawer handle */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4 mt-4" />

          {/* Scrollable area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 sm:max-w-4xl mx-auto">
              
              {/* Intro text */}
              <h2 className="text-xl font-bold mb-2">Become a part of SIGA</h2>
              <p className="text-sm mb-4">
                Any firm or individual involved in the Garment trade & industry as a manufacturer,
                distributor or agent or involved as a consultant or promoter is eligible to become
                a member of SIGA subject to approval of the managing committee.
              </p>
              <p className="text-sm mb-4">
                Membership will be considered only with an application form along with the payment
                to the marked membership category.
              </p>

              {/* Membership types */}
              <div className="mb-4 space-y-2">
                <p className="font-semibold">Life Patron Members</p>
                <p className="text-sm">
                  Life time subscription Rs. 20000/- Twenty Thousand + GST as applicable.
                </p>
                <p className="font-semibold mt-3">Ordinary Members</p>
                <p className="text-sm">
                  Yearly membership subscription Rs. 2000/- payable in the month of April every year.
                </p>
                <p className="font-semibold mt-3">Associate Members</p>
                <p className="text-sm">
                  Yearly membership subscription Rs. 2000/- (+GST as applicable).
                </p>
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-4">Membership Form</h3>

              {/* Membership Category */}
              <Label>Membership Category *</Label>
              <Select value={membershipCategory} onValueChange={setMembershipCategory}>
                <SelectTrigger className="mt-1 mb-4">
                  <SelectValue placeholder="Select Membership Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="life-patron">Life Patron</SelectItem>
                  <SelectItem value="ordinary">Ordinary</SelectItem>
                  <SelectItem value="associate">Associate</SelectItem>
                </SelectContent>
              </Select>

              {/* Company Name */}
              <Label>Company Name *</Label>
              <Input className="mt-1 mb-4" />

              {/* GST No */}
              <Label>GST No *</Label>
              <Input className="mt-1 mb-4" />

              {/* Auth Rep Name */}
              <Label>Auth Rep Name *</Label>
              <Input className="mt-1 mb-4" />

              {/* Mobile No */}
              <Label>Mobile No *</Label>
              <Input className="mt-1 mb-4" type="tel" />

              {/* Photo */}
              <Label>Photo *</Label>
              <Input className="mt-1 mb-4" type="file" />

              {/* Address */}
              <Label>Address *</Label>
              <Input className="mt-1 mb-4" />

              {/* Email Id */}
              <Label>Email Id *</Label>
              <Input className="mt-1 mb-4" type="email" />

              {/* Office Phone No */}
              <Label>Office Phone No *</Label>
              <Input className="mt-1 mb-4" type="tel" />

              <Separator className="my-4" />

              {/* Business Type */}
              <Label>Business Type *</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="mt-1 mb-4">
                  <SelectValue placeholder="Select Business Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="promoter">Promoter</SelectItem>
                </SelectContent>
              </Select>

              {/* Brands */}
              <Label>Brands</Label>
              <Input className="mt-1 mb-4" />

              {/* Logo */}
              <Label>Logo</Label>
              <Input className="mt-1 mb-4" type="file" />

              <Separator className="my-4" />

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4">
                <Drawer.Close asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Drawer.Close>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BecomeMember;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface SearchProps {
  onSearch?: (params: {
    location: string;
    checkIn?: Date;
    checkOut?: Date;
    guests: number;
  }) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (!location) return;

    if (onSearch) {
      onSearch({
        location,
        checkIn,
        checkOut,
        guests,
      });
    } else {
      const searchParams = new URLSearchParams();
      searchParams.set("location", location);
      if (checkIn) searchParams.set("checkIn", checkIn.toISOString());
      if (checkOut) searchParams.set("checkOut", checkOut.toISOString());
      searchParams.set("guests", guests.toString());

      window.location.href = `/search?${searchParams.toString()}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="rounded-r-none"
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
              className="w-full rounded-none text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(guests + 1)}
              className="rounded-l-none"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleSearch}
          className="bg-[#FF385C] hover:bg-[#E31C5F] text-white px-8 py-2 rounded-lg"
        >
          Search
        </Button>
      </div>
    </div>
  );
}

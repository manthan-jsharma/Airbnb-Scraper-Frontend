"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  CalendarIcon,
  Heart,
  Share,
  Star,
  Wifi,
  Tv,
  CookingPotIcon as Kitchen,
  ParkingMeterIcon as Parking,
  AirVent,
  Coffee,
} from "lucide-react";

interface Listing {
  id: number;
  title: string;
  location: string;
  address: string;
  price_per_night: number;
  currency: string;
  total_price: number;
  image_urls: string[];
  rating: number;
  description: string;
  reviews_count: number;
  amenities: string[];
  host: {
    name: string;
    image: string;
    joined: string;
    is_superhost: boolean;
  };
  property_type: string;
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
}

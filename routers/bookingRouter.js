import express from "express";
import {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// create booking
router.post("/", createBooking);

// get bookings
router.get("/customer", getCustomerBookings);
router.get("/provider", getProviderBookings);

export default router;
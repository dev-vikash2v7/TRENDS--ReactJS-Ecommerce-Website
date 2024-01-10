import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_publishable_key");

export default stripePromise;

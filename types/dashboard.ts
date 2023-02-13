import type { Customer, Goal, Benchmark } from "./db";

type DashboardData = {
  success: boolean;
  message: string;
  customer: Customer;
  goal: Goal;
  benchmarks: Benchmark[];
};

export type { DashboardData };

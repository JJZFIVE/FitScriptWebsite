import type { Customer, Goal } from "./db";

type DashboardData = {
  success: boolean;
  message: string;
  customer: Customer;
  goal: Goal;
  benchmarks: {
    bench: number | undefined | null;
    squat: number | undefined | null;
    deadlift: number | undefined | null;
  };
};

export type { DashboardData };

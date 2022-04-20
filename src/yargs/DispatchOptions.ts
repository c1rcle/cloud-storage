enum Action {
  BenchmarkNative = "benchmark_native",
  BenchmarkWeb = "benchmark_web",
}

export interface DispatchOptions {
  event: Action;
  token: string;
  owner: string;
  repo: string;
}

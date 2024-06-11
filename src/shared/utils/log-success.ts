type LogSuccessParams = {
  title: string;
  description: string;
};

export function logSuccess(params: LogSuccessParams) {
  console.log(`${params.title} ✅`);
  console.log('\x1b[32m', params.description);
  console.log('\x1b[0m');
}

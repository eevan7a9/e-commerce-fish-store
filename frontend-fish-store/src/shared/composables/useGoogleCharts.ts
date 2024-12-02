// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const google: any;

let isGoogleChartsLoaded = false;
let isLoading = false;

export async function loadGoogleChart() {
  return new Promise<void>((resolve) => {
    if (isGoogleChartsLoaded) {
      return resolve();
    }
    if (isLoading) {
      const interval = setInterval(() => {
        if (isGoogleChartsLoaded) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
      return;
    }
    isLoading = true;

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      isGoogleChartsLoaded = true;
      isLoading = false;
      resolve();
    });
  });
}

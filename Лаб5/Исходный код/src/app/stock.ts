export class Stock {
  name: string;
  id: number;
  disLaw: 'U' | 'N' | 'B' = 'U';
  maxStep = 10;
  amount = 100;
  startPrice = 5;
}

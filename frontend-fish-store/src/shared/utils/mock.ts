import {
  OrderPaymentMethod,
  OrderPaymentStatus,
  OrderStatus,
} from '../enums/order';
import { RequestResponse } from '../interface/api';
import { User, UserDetails } from '../interface/user';
import { Order, OrderCustomer } from '../interface/order';

export function generateRandomId(): string {
  return `${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
}

export function generateRandomUsername(
  possibleAdjectives?: string[],
  possibleNouns?: string[]
): string {
  const adjectives = possibleAdjectives || ['Good', 'Hard', 'Smiling', 'Lazy'];
  const nouns = possibleNouns || ['User', 'Panda', 'Tester', 'Shark', 'Wolf'];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(100 + Math.random() * 900); // Random 3-digit number
  const specialChars = ['_', '.', '-', ''];
  const randomSpecialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];
  return `${randomAdjective}${randomSpecialChar}${randomNoun}${randomNumber}`;
}

export function generateRandomUserId(): string | undefined {
  const shouldReturnUndefined = Math.random() < 0.3;
  if (shouldReturnUndefined) {
    return undefined;
  }
  return `${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
}

export function generateRandomPhone(): string {
  // Randomizes the last 4 digits of the phone number
  const basePhone = '+4241242424';
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  return `${basePhone}${randomDigits}`;
}

export function generateRandomEmail(): string {
  // Randomizes the email prefix
  const prefixes = ['test', 'user123', 'sample', 'demo', 'Hass', 'mock', 'sad'];
  const domains = ['email.com', 'example.com', 'test.com'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const randomNum = Math.floor(Math.random() * 120);
  return `${randomPrefix}${randomNum}@${randomDomain}`;
}

export function generateRandomAddress(): string {
  // Returns a random address
  const addresses = [
    '1234 Mars Street, Test 5B',
    '5678 Jupiter Ave, Suite 101',
    '9101 Saturn Blvd, Apt 3A',
    '4321 Neptune Rd, Unit 202',
  ];
  return addresses[Math.floor(Math.random() * addresses.length)];
}

export function generateRandomCity(): string {
  // Returns a random city
  const cities = ['Springfield', 'Rivertown', 'Testville', 'Mars City'];
  return cities[Math.floor(Math.random() * cities.length)];
}

export function generateRandomState(): string {
  // Returns a random state
  const states = [
    'Testian Test',
    'Mars Province',
    'Jupiter State',
    'Neptune Territory',
  ];
  return states[Math.floor(Math.random() * states.length)];
}

export function generateRandomPostalCode(): string {
  // Returns a random postal code
  const postalCodes = ['12345', '54321', '98765', '67890'];
  return postalCodes[Math.floor(Math.random() * postalCodes.length)];
}

export function generateRandomCountry(): string {
  // Returns a random country
  const countries = [
    'United Test',
    'Mars Union',
    'Jupiter Federation',
    'Neptune Republic',
  ];
  return countries[Math.floor(Math.random() * countries.length)];
}

export function generateRandomAmount(): number {
  return parseFloat((Math.random() * 1000 + 20).toFixed(2)); // Random amount between 20 and 1020
}

export function generateRandomWeight(): number {
  return parseFloat((Math.random() * 50 + 0.5).toFixed(2)); // Random weight between 0.5 and 50 kg
}

export function generateRandomDate(): string {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  return new Date(start + Math.random() * (end - start)).toUTCString();
}

export function generateMockOrders(
  length: number,
  staticData?: {
    user_id?: number | string;
    name?: string;
    phone?: string;
    email?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  }
): Order[] {
  const statuses = Object.values(OrderStatus);
  const paymentMethods = Object.values(OrderPaymentMethod);
  const paymentStatuses = Object.values(OrderPaymentStatus);

  return Array.from({ length }, () => ({
    id: generateRandomId(),
    user_id: generateRandomUserId(),
    name: 'test_user',
    phone: staticData?.phone || generateRandomPhone(),
    email: staticData?.email || generateRandomEmail(),
    line1: staticData?.line1 || generateRandomAddress(),
    line2: staticData?.line2 || generateRandomAddress(),
    city: staticData?.city || generateRandomCity(),
    state: staticData?.state || generateRandomState(),
    postal_code: staticData?.postal_code || generateRandomPostalCode(),
    country: staticData?.country || generateRandomCountry(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    payment_method:
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    payment_status:
      paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
    total_amount: generateRandomAmount(),
    total_weight: generateRandomWeight(),
    created_at: generateRandomDate(),
    updated_at: generateRandomDate(),
  }));
}

export function generateMockUser(opts?: {
  id?: string | number;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  email_verified_at?: boolean;
  profile_img?: string;
  created_at?: string;
  has_stripe?: boolean;
}): User {
  const date = opts?.created_at || new Date('11/02/2024').toUTCString();
  return {
    id: opts?.id || generateRandomId(),
    name: opts?.name || generateRandomUsername(),
    email: opts?.email || generateRandomEmail(),
    email_verified_at: false,
    address: generateRandomAddress(),
    phone: generateRandomPhone(),
    is_admin: opts?.isAdmin,
    profile_img: opts?.profile_img || 'https://placehold.co/100@2x.png',
    created_at: date,
    updated_at: date,
  };
}

export function generateMockUserDetails(opts: Partial<User>): UserDetails {
  return {
    ...generateMockUser({ ...opts }),
    orders: generateMockOrders(
      opts.orders_made || Math.floor(Math.random() * 5),
      {
        user_id: opts.id,
      }
    ),
    has_stripe: !!Math.floor(Math.random() * 2),
  };
}

export function generateMockRegisteredUsers(length: number): User[] {
  return Array.from({ length }, () => ({
    ...generateMockUser(),
    has_stripe: !!Math.floor(Math.random() * 2),
    orders_made: Math.floor(Math.random() * 10),
  }));
}

export function generateMockOrdersCustomers(length: number): OrderCustomer[] {
  return Array.from({ length }, () => ({
    user_id: generateRandomUserId(),
    name: generateRandomUsername(),
    email: generateRandomEmail(),
    address: generateRandomAddress(),
    phone: generateRandomPhone(),
    has_stripe: !!Math.floor(Math.random() * 2),
    orders_made: Math.floor(Math.random() * 10),
  }));
}

/**
 *
 * @param data - the data to return after
 * @param timeout - delay before promise ends
 * @returns
 */
export async function createPromiseRequest<T>(
  data: T,
  timeout: number = 2000
): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), timeout);
  });
}

/**
 *
 * @param data - the data to return after
 * @param callbacks - function that returns sets data
 * @param hooks - functions to call before & after the mock request
 * @returns object - { success: true }
 */
export async function mockRequest<T>(
  data: T,
  hooks?: { before?: () => void; after?: () => void },
  callbacks?: (data: T) => void
): Promise<RequestResponse<T> | void> {
  hooks?.before?.();
  const res = await createPromiseRequest<T>(data);
  callbacks?.(res);
  hooks?.after?.();

  const message = (data as { message?: string }).message || 'Success';
  return { success: true, data: res, message };
}

/**
 *
 * @param data - the data to return after
 * @param callbacks - function that return sets { user: T; token: string; expires: string }
 * @param hooks - functions to call before & after the mock request
 */
export async function mockSigninRequest<T>(
  data: T,
  callbacks?: (data: { user: T; token: string; expires: string }) => void,
  hooks?: {
    before?: () => void;
    after?: () => void;
  }
): Promise<RequestResponse<T> | void> {
  hooks?.before?.();
  const res = await createPromiseRequest<T>(data, 2000);
  callbacks?.({
    user: res,
    token: 'test-secret',
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString(),
  });
  hooks?.after?.();
  return { success: true };
}

interface FormatMoneyOptions {
  currency?: string;
  options?: Intl.NumberFormatOptions;
}

/// Converts a number of cents into a currency string with the provided
/// currency.
export function formatMoney(
  cents: number | undefined,
  options?: FormatMoneyOptions,
) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: options?.currency ?? 'USD',
    ...options?.options,
  }).format((cents ?? 0) / 100);
}

/// Converts a number to a comma-separated string.
export function formatNumber(
  number: number,
  options?: Intl.NumberFormatOptions,
): string {
  return Intl.NumberFormat('en-US', options).format(number);
}

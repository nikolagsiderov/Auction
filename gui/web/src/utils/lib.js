import ceil from "lodash/ceil";
import { differenceInMinutes } from "date-fns";

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  date - which is created comment data
 * @returns string - formatted from now
 */

function getDateDifference(date) {
  let diff = differenceInMinutes(new Date(), new Date(date));
  if (diff < 60) return diff + " minutes ago";
  diff = ceil(diff / 60);
  if (diff < 24) return `${diff} hour${diff === 0 ? "" : "s"} ago`;
  diff = ceil(diff / 24);
  if (diff < 30) return `${diff} day${diff === 0 ? "" : "s"} ago`;
  diff = ceil(diff / 30);
  if (diff < 12) return `${diff} month${diff === 0 ? "" : "s"} ago`;
  diff = diff / 12;
  return `${diff.toFixed(1)} year${ceil(diff) === 0 ? "" : "s"} ago`;
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - ITEM PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

function currency(price, fraction = 2) {
  const formatCurrency = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  });
  return formatCurrency.format(price) + "лв";
}

export { currency, getDateDifference };

import React from 'react'
import Strings from './Strings';

const currencies = {
  inr: '\u20B9',
  usd: '\u0024',
  euro: '\u20AC'
}

const incomeCat = ["gift", "interest", "investmentincome", "loan", "moneytransfer", "mutualfund", "others", "refund", "salary", "savings", "transfer", "work"];

const expenseCat = ["moneytransfer", "airticket", "beauty", "bike", "bill", "book", "breakfast", "business", "car", "chicken", "child", "clothes", "coffee", "cookies", "courier", "cycle", "dining", "dinner", "donation", "drinks", "education", "electricity", "electronics", "emi", "entertainment", "fastfood", "finance", "flowers", "fooddrinks", "fruits", "games", "gas", "gift", "grocery", "gymfitness", "health", "heart", "hotel", "house", "icecream", "imps", "insurance", "investment", "jewellery", "job", "loan", "lunch", "maid", "maintenance", "medical", "milk", "misc", "mobile", "month", "music", "mutualfund", "others", "pay", "pet", "rent", "saloon", "savings", "shoes", "shopping", "spa", "stationery", "tax", "taxi", "ticket", "toy", "train", "transfer", "travel", "tv", "vacation", "vegtables", "wallet", "water"];

export {
  currencies,
  incomeCat,
  expenseCat
};
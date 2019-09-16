const iconList = {
  airticket: { icon: "airticket", color: "#088da5", label: "Airticket", desc: ""},
  beauty: { icon: "beauty", color: "#8a2be2", label: "Beauty", desc: ""},
  bike: { icon: "bike", color: "#133337", label: "Bike", desc: ""},
  bill: { icon: "bill", color: "#008080", label: "Bill", desc: ""},
  book: { icon: "book", color: "#ffa500", label: "Book", desc: ""},
  breakfast: { icon: "breakfast", color: "#003366", label: "Breakfast", desc: ""},
  business: { icon: "business", color: "#008000", label: "Business", desc: ""},
  car: { icon: "car", color: "#660066", label: "Car", desc: ""},
  chicken: { icon: "chicken", color: "#ff4040", label: "Chicken", desc: ""},
  child: { icon: "child", color: "#3399ff", label: "Child", desc: ""},
  clothes: { icon: "clothes", color: "#101010", label: "Clothes", desc: ""},
  coffee: { icon: "coffee", color: "#BC70A4", label: "Coffee", desc: ""},
  cookies: { icon: "cookies", color: "#FF6F61", label: "Cookies", desc: ""},
  courier: { icon: "courier", color: "#9B1B30", label: "Courier", desc: ""},
  cycle: { icon: "cycle", color: "#6B5B95", label: "Cycle", desc: ""},
  dining: { icon: "dining", color: "#615550", label: "Dining", desc: ""},
  dinner: { icon: "dinner", color: "#77212E", label: "Dinner", desc: ""},
  donation: { icon: "donation", color: "#FA9A85", label: "Donation", desc: ""},
  drinks: { icon: "drinks", color: "#5A3E36", label: "Drinks", desc: ""},
  education: { icon: "education", color: "#CE5B78", label: "Education", desc: ""},
  electricity: { icon: "electricity", color: "#935529", label: "Electricity", desc: ""},
  electronics: { icon: "electronics", color: "#E08119", label: "Electronics", desc: ""},
  emi: { icon: "emi", color: "#2A4B7C", label: "EMI", desc: ""},
  entertainment: { icon: "entertainment", color: "#577284", label: "Entertainment", desc: ""},
  fastfood: { icon: "fastfood", color: "#F96714", label: "Fastfood", desc: ""},
  finance: { icon: "finance", color: "#264E36", label: "Finance", desc: ""},
  flowers: { icon: "flowers", color: "#2A293E", label: "Flowers", desc: ""},
  fooddrinks: { icon: "fooddrinks", color: "#616247", label: "Food Drinks", desc: ""},
  fruits: { icon: "fruits", color: "#8b0000", label: "Fruits", desc: ""},
  games: { icon: "games", color: "#797B3A", label: "Games", desc: ""},
  gas: { icon: "gas", color: "#DD4132", label: "Gas", desc: ""},
  gift: { icon: "gift", color: "#9E1030", label: "Gift", desc: ""},
  grocery: { icon: "grocery", color: "#FE840E", label: "Grocery", desc: ""},
  gymfitness: { icon: "gymfitness", color: "#FF6F61", label: "Gym", desc: ""},
  health: { icon: "health", color: "#8D9440", label: "Health", desc: ""},
  heart: { icon: "heart", color: "#C62168", label: "Heart", desc: ""},
  hotel: { icon: "hotel", color: "#00539C", label: "Hotel", desc: ""},
  house: { icon: "house", color: "#755139", label: "House", desc: ""},
  icecream: { icon: "icecream", color: "#343148", label: "Icecream", desc: ""},
  imps: { icon: "imps", color: "#6B5B95", label: "Imps", desc: ""},
  insurance: { icon: "insurance", color: "#7F4145", label: "Insurance", desc: ""},
  interest: { icon: "interest", color: "#BD3D3A", label: "Interest", desc: ""},
  investment: { icon: "investment", color: "#3F69AA", label: "Investment", desc: ""},
  jewellery: { icon: "jewellery", color: "#E47A2E", label: "Jewellery", desc: ""},
  job: { icon: "job", color: "#006E6D", label: "Job", desc: ""},
  loan: { icon: "loan", color: "#E94B3C", label: "Loan", desc: ""},
  lunch: { icon: "lunch", color: "#944743", label: "Lunch", desc: ""},
  maid: { icon: "maid", color: "#00A591", label: "Maid", desc: ""},
  maintenance: { icon: "maintenance", color: "#6B5B95", label: "Maintenance", desc: ""},
  medical: { icon: "medical", color: "#6C4F3D", label: "Medical", desc: ""},
  milk: { icon: "milk", color: "#92B558", label: "Milk", desc: ""},
  misc: { icon: "misc", color: "#DC4C46", label: "Misc", desc: ""},
  mobile: { icon: "mobile", color: "#766F57", label: "Mobile", desc: ""},
  moneytransfer: { icon: "moneytransfer", color: "#C48F65", label: "Account Transfer", desc: ""},
  month: { icon: "month", color: "#223A5E", label: "Month", desc: ""},
  music: { icon: "music", color: "#898E8C", label: "Music", desc: ""},
  mutualfund: { icon: "mutualfund", color: "#005960", label: "Mutualfund", desc: ""},
  others: { icon: "others", color: "#9C9A40", label: "Others", desc: ""},
  pay: { icon: "pay", color: "#D2691E", label: "Pay", desc: ""},
  pet: { icon: "pet", color: "#578CA9", label: "Pet", desc: ""},
  refund: { icon: "refund", color: "#004B8D", label: "Refund", desc: ""},
  rent: { icon: "rent", color: "#F2552C", label: "Rent", desc: ""},
  salary: { icon: "salary", color: "#CE3175", label: "Salary", desc: ""},
  saloon: { icon: "saloon", color: "#5A7247", label: "Saloon", desc: ""},
  savings: { icon: "savings", color: "#4C6A92", label: "Savings", desc: ""},
  shoes: { icon: "shoes", color: "#838487", label: "Shoes", desc: ""},
  shopping: { icon: "shopping", color: "#B93A32", label: "Shopping", desc: ""},
  spa: { icon: "spa", color: "#AF9483", label: "Spa", desc: ""},
  stationery: { icon: "stationery", color: "#006E51", label: "Stationery", desc: ""},
  tax: { icon: "tax", color: "#9E4624", label: "Tax", desc: ""},
  taxi: { icon: "taxi", color: "#F7786B", label: "Taxi", desc: ""},
  ticket: { icon: "ticket", color: "#034F84", label: "Ticket", desc: ""},
  toy: { icon: "toy", color: "#DD4132", label: "Toy", desc: ""},
  train: { icon: "train", color: "#6B5B95", label: "Train", desc: ""},
  transfer: { icon: "transfer", color: "#88B04B", label: "Transfer", desc: ""},
  travel: { icon: "travel", color: "#955251", label: "Travel", desc: ""},
  trends: { icon: "trends", color: "#B565A7", label: "Trends", desc: ""},
  tv: { icon: "tv", color: "#009B77", label: "Tv", desc: ""},
  vacation: { icon: "vacation", color: "#D65076", label: "Vacation", desc: ""},
  vegtables: { icon: "vegtables", color: "#45B8AC", label: "Vegtables", desc: ""},
  wallet: { icon: "wallet", color: "#EFC050", label: "Wallet", desc: ""},
  water: { icon: "water", color: "#5B5EA6", label: "Water", desc: ""},
  work: { icon: "work", color: "#9B2335", label: "Work", desc: ""}
};

const iconListArray = Object.values(iconList);

export {
  iconList,
  iconListArray
}
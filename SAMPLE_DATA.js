// MongoDB Sample Data - Run these commands in MongoDB shell or use MongoDB Compass

// Clear existing data
db.users.deleteMany({})
db.products.deleteMany({})
db.orders.deleteMany({})

// 1. CREATE ADMIN USER
db.users.insertOne({
  name: "Admin User",
  email: "admin@foodapp.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash "admin123"
  phone: "+1-800-ADMIN",
  address: "Restaurant HQ, 123 Main St",
  role: "admin",
  createdAt: new Date()
})

// 2. CREATE SAMPLE PRODUCTS - APPETIZERS
db.products.insertMany([
  {
    name: "Hummus",
    nameAr: "حمص",
    description: "Creamy chickpea dip with tahini and lemon",
    descriptionAr: "صلصة الحمص الكريمية مع الطحينة والليمون",
    price: 4.99,
    image: "https://via.placeholder.com/300?text=Hummus",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 5,
    rating: 4.5,
    createdAt: new Date()
  },
  {
    name: "Samosa",
    nameAr: "السمبوسة",
    description: "Crispy pastry filled with spiced potatoes and peas",
    descriptionAr: "معجنات مقرمشة محشوة بالبطاطس والبازلاء",
    price: 3.99,
    image: "https://via.placeholder.com/300?text=Samosa",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 10,
    rating: 4.3,
    createdAt: new Date()
  },
  {
    name: "Spring Rolls",
    nameAr: "لفائف الربيع",
    description: "Crispy rolls filled with vegetables",
    descriptionAr: "لفائف مقرمشة محشوة بالخضراوات",
    price: 5.99,
    image: "https://via.placeholder.com/300?text=Spring+Rolls",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 12,
    rating: 4.4,
    createdAt: new Date()
  }
])

// 3. CREATE SAMPLE PRODUCTS - MAIN COURSES
db.products.insertMany([
  {
    name: "Chicken Biryani",
    nameAr: "برياني الدجاج",
    description: "Fragrant rice dish with tender chicken and spices",
    descriptionAr: "طبق الأرز العطري مع الدجاج الرقيق والتوابل",
    price: 12.99,
    image: "https://via.placeholder.com/300?text=Chicken+Biryani",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 25,
    rating: 4.7,
    createdAt: new Date()
  },
  {
    name: "Butter Chicken",
    nameAr: "دجاج الزبدة",
    description: "Tender chicken in creamy tomato sauce",
    descriptionAr: "دجاج رقيق في صلصة الطماطم الكريمية",
    price: 11.99,
    image: "https://via.placeholder.com/300?text=Butter+Chicken",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 20,
    rating: 4.6,
    createdAt: new Date()
  },
  {
    name: "Lamb Kebab",
    nameAr: "كبة الضأن",
    description: "Grilled lamb with spices and fresh herbs",
    descriptionAr: "لحم الضأن المشوي مع التوابل والأعشاب الطازجة",
    price: 14.99,
    image: "https://via.placeholder.com/300?text=Lamb+Kebab",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 30,
    rating: 4.8,
    createdAt: new Date()
  },
  {
    name: "Vegetable Curry",
    nameAr: "اليخنة النباتية",
    description: "Mix of seasonal vegetables in aromatic curry sauce",
    descriptionAr: "خليط من الخضراوات الموسمية في صلصة الكاري العطرية",
    price: 9.99,
    image: "https://via.placeholder.com/300?text=Veggie+Curry",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 20,
    rating: 4.4,
    createdAt: new Date()
  }
])

// 4. CREATE SAMPLE PRODUCTS - DESSERTS
db.products.insertMany([
  {
    name: "Gulab Jamun",
    nameAr: "جولاب جامون",
    description: "Soft milk solid balls in sugar syrup",
    descriptionAr: "كرات حليب ناعمة في شراب السكر",
    price: 4.99,
    image: "https://via.placeholder.com/300?text=Gulab+Jamun",
    category: "desserts",
    categoryAr: "الحلويات",
    availability: true,
    preparationTime: 8,
    rating: 4.5,
    createdAt: new Date()
  },
  {
    name: "Kheer",
    nameAr: "الخير",
    description: "Rice pudding with milk and cardamom",
    descriptionAr: "حلوى الأرز بالحليب والهيل",
    price: 3.99,
    image: "https://via.placeholder.com/300?text=Kheer",
    category: "desserts",
    categoryAr: "الحلويات",
    availability: true,
    preparationTime: 5,
    rating: 4.3,
    createdAt: new Date()
  },
  {
    name: "Baklava",
    nameAr: "البقلاوة",
    description: "Pastry layers with honey and nuts",
    descriptionAr: "طبقات المعجنات مع العسل والمكسرات",
    price: 5.99,
    image: "https://via.placeholder.com/300?text=Baklava",
    category: "desserts",
    categoryAr: "الحلويات",
    availability: true,
    preparationTime: 5,
    rating: 4.7,
    createdAt: new Date()
  }
])

// 5. CREATE SAMPLE PRODUCTS - BEVERAGES
db.products.insertMany([
  {
    name: "Mango Lassi",
    nameAr: "لاسي المانجو",
    description: "Refreshing yogurt drink with mango",
    descriptionAr: "مشروب اللبن المنعش مع المانجو",
    price: 2.99,
    image: "https://via.placeholder.com/300?text=Mango+Lassi",
    category: "beverages",
    categoryAr: "المشروبات",
    availability: true,
    preparationTime: 3,
    rating: 4.5,
    createdAt: new Date()
  },
  {
    name: "Iced Tea",
    nameAr: "الشاي المثلج",
    description: "Fresh brewed iced tea",
    descriptionAr: "الشاي المخمر الطازج المثلج",
    price: 1.99,
    image: "https://via.placeholder.com/300?text=Iced+Tea",
    category: "beverages",
    categoryAr: "المشروبات",
    availability: true,
    preparationTime: 2,
    rating: 4.2,
    createdAt: new Date()
  },
  {
    name: "Fresh Lime Juice",
    nameAr: "عصير الليمون الطازج",
    description: "Freshly squeezed lime juice",
    descriptionAr: "عصير الليمون المعصور الطازج",
    price: 2.49,
    image: "https://via.placeholder.com/300?text=Lime+Juice",
    category: "beverages",
    categoryAr: "المشروبات",
    availability: true,
    preparationTime: 2,
    rating: 4.3,
    createdAt: new Date()
  }
])

// 6. CREATE SAMPLE PRODUCTS - SIDES
db.products.insertMany([
  {
    name: "Garlic Naan",
    nameAr: "خبز النان بالثوم",
    description: "Soft Indian bread with garlic",
    descriptionAr: "خبز هندي ناعم مع الثوم",
    price: 2.99,
    image: "https://via.placeholder.com/300?text=Garlic+Naan",
    category: "sides",
    categoryAr: "الإضافات",
    availability: true,
    preparationTime: 8,
    rating: 4.4,
    createdAt: new Date()
  },
  {
    name: "Rice Pilaf",
    nameAr: "الرز البلاو",
    description: "Fragrant rice cooked with spices",
    descriptionAr: "الرز العطري المطبوخ مع التوابل",
    price: 3.49,
    image: "https://via.placeholder.com/300?text=Rice+Pilaf",
    category: "sides",
    categoryAr: "الإضافات",
    availability: true,
    preparationTime: 10,
    rating: 4.3,
    createdAt: new Date()
  },
  {
    name: "Mixed Vegetable",
    nameAr: "الخضراوات المشكلة",
    description: "Assorted seasonal vegetables",
    descriptionAr: "خضراوات موسمية متنوعة",
    price: 2.49,
    image: "https://via.placeholder.com/300?text=Mixed+Veg",
    category: "sides",
    categoryAr: "الإضافات",
    availability: true,
    preparationTime: 10,
    rating: 4.2,
    createdAt: new Date()
  }
])

console.log("✅ Sample data inserted successfully!")
console.log("📊 Collections created:")
console.log("   - Users: 1 admin user")
console.log("   - Products: 14 food items (5 categories)")
console.log("   - Orders: Ready for order creation")

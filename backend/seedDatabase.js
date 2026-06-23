const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  // --- APPETIZERS ---
  {
    name: "Hummus",
    nameAr: "حمص",
    description: "Creamy chickpea dip with tahini, olive oil, and fresh lemon",
    descriptionAr: "صلصة الحمص الكريمية مع الطحينة وزيت الزيتون والليمون",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=600&q=80",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 5,
    rating: 4.5
  },
  {
    name: "Samosa",
    nameAr: "السمبوسة",
    description: "Crispy golden pastry triangles filled with spiced potatoes and peas",
    descriptionAr: "معجنات مقرمشة ذهبية محشوة بالبطاطس المتبلة والبازلاء",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 10,
    rating: 4.3
  },
  {
    name: "Spring Rolls",
    nameAr: "لفائف الربيع",
    description: "Crispy wrapper rolls filled with shredded fresh vegetables",
    descriptionAr: "لفائف مقرمشة محشوة بالخضراوات الطازجة المقطعة",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 12,
    rating: 4.4
  },
  {
    name: "Stuffed Grape Leaves",
    nameAr: "ورق عنب محشي",
    description: "Grape leaves stuffed with a savory mixture of rice, herbs, and lemon juice",
    descriptionAr: "ورق عنب محشي بخلطة الأرز المتبلة بالأعشاب وعصير الليمون",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 8,
    rating: 4.6
  },
  {
    name: "Baba Ganoush",
    nameAr: "بابا غنوج",
    description: "Smoky roasted eggplant dip blended with garlic, tahini, and olive oil",
    descriptionAr: "متبل باذنجان مشوي مع الثوم والطحينة وزيت الزيتون",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80",
    category: "appetizers",
    categoryAr: "المقبلات",
    availability: true,
    preparationTime: 5,
    rating: 4.2
  },

  // --- MAINS ---
  {
    name: "Chicken Biryani",
    nameAr: "برياني الدجاج",
    description: "Fragrant basmati rice layered with juicy marinated chicken and warm spices",
    descriptionAr: "طبق أرز البسمتي العطري مع الدجاج المتبل والتوابل الغنية",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 25,
    rating: 4.7
  },
  {
    name: "Butter Chicken",
    nameAr: "دجاج الزبدة",
    description: "Tender boneless chicken pieces slow-simmered in a rich, creamy tomato sauce",
    descriptionAr: "قطع دجاج طرية مطهوة ببطء في صلصة الطماطم الغنية والكريمية",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 20,
    rating: 4.6
  },
  {
    name: "Lamb Kebab",
    nameAr: "كباب الضأن",
    description: "Skewered pieces of succulent grilled lamb marinated in spices and fresh herbs",
    descriptionAr: "أسياخ لحم الضأن المشوي المتبل بالتوابل والأعشاب الطازجة",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 30,
    rating: 4.8
  },
  {
    name: "Tikka Masala",
    nameAr: "تيكا ماسالا",
    description: "Roasted chunks of chicken tikka served in a spicy, flavorful creamy sauce",
    descriptionAr: "قطع دجاج تيكا مشوية تقدم في صلصة كريمية متبلة ونكهة غنية",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 22,
    rating: 4.7
  },
 {
    name: "Falafel Wrap",
    nameAr: "لفافة الفلافل",
    description: "Crispy fried falafel balls tucked in flatbread with tahini, pickles, and fresh salad",
    descriptionAr: "أقراص فلافل مقرمشة في خبز مفرود مع الطحينة والمخلل والسلطة الطازجة",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 15,
    rating: 4.5
  },
  {
    name: "Beef Shawarma Plate",
    nameAr: "طبق شاورما لحم",
    description: "Thinly sliced marinated beef served with rice, onions, and garlic sauce",
    descriptionAr: "شرائح شاورما لحم بقري متبل يقدم مع الأرز، البصل، وصلصة الثوم",
    price: 13.49,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 18,
    rating: 4.6
  },
  {
    name: "Margherita Pizza",
    nameAr: "بيتزا مارغريتا",
    description: "Classic pizza topped with fresh mozzarella, tomato sauce, and basil leaves",
    descriptionAr: "بيتزا كلاسيكية مغطاة بجبن الموزاريلا الطازج، صلصة الطماطم، وأوراق الريحان",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80",
    category: "mains",
    categoryAr: "الأطباق الرئيسية",
    availability: true,
    preparationTime: 15,
    rating: 4.4
  },

  // --- SIDES ---
  {
    name: "French Fries",
    nameAr: "بطاطس مقلية",
    description: "Golden, crispy potato fries lightly seasoned with sea salt",
    descriptionAr: "أصابع بطاطس مقرمشة ذهبية متبلة بقليل من ملح البحر",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    category: "sides",
    categoryAr: "الأطباق الجانبية",
    availability: true,
    preparationTime: 7,
    rating: 4.1
  },
{
    name: "Garlic Naan",
    nameAr: "نان بالثوم",
    description: "Leavened flatbread brushed with melted butter and fresh minced garlic",
    descriptionAr: "خبز هندي مسطح مدهون بالزبدة الذائبة والثوم المفروم الطازج",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    category: "sides",
    categoryAr: "الأطباق الجانبية",
    availability: true,
    preparationTime: 5,
    rating: 4.8
  },

  // --- DESSERTS ---
  {
    name: "Chocolate Cake",
    nameAr: "كعكة الشوكولاتة",
    description: "Rich, dense, and moist chocolate layer cake with fudge frosting",
    descriptionAr: "كعكة شوكولاتة غنية، رطبة، ومغطاة بطبقة كريمة الفوندان",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    category: "desserts",
    categoryAr: "الحلويات",
    availability: true,
    preparationTime: 5,
    rating: 4.6
  },
  {
    name: "Baklava",
    nameAr: "البقلاوة",
    description: "Sweet pastry made of layers of filo filled with chopped nuts and syrup",
    descriptionAr: "رقائق عجين الفيلو المقرمشة المحشوة بالمكسرات والمسقية بالقطر الحلو",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80",
    category: "desserts",
    categoryAr: "الحلويات",
    availability: true,
    preparationTime: 4,
    rating: 4.9
  },
 {
    name: "Kunafa",
    nameAr: "كنافة",
    description: "Traditional spun pastry soaked in sweet syrup, layered with gooey cheese",
    descriptionAr: "معجنات الكنافة التقليدية المشبعة بالقطر الحلو والمحشوة بالجبن الذائب",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    category: "desserts",
    categoryAr: "الحلويات",
    availability: true,
    preparationTime: 12,
    rating: 4.8
  },

  // --- BEVERAGES ---
  {
    name: "Mango Lassi",
    nameAr: "لاسي المانجو",
    description: "Refreshing yogurt-based mango blend drink with a touch of cardamom",
    descriptionAr: "مشروب زبادي منعش ومخفوق مع المانجو واللمسة من الهيل",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    category: "beverages",
    categoryAr: "المشروبات",
    availability: true,
    preparationTime: 5,
    rating: 4.4
  },
  {
    name: "Mint Lemonade",
    nameAr: "ليمون بالنعناع",
    description: "Freshly squeezed lemon juice blended with ice and cool mint leaves",
    descriptionAr: "عصير ليمون طازج ومخفوق مع الثلج وأوراق النعناع المنعشة",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    category: "beverages",
    categoryAr: "المشروبات",
    availability: true,
    preparationTime: 5,
    rating: 4.5
  },
  {
    name: "Soft Drink",
    nameAr: "مشروب غازي",
    description: "Chilled choice of cola, diet cola, sprite, or fanta served over ice",
    descriptionAr: "مشروب غازي بارد حسب اختيارك (كولا، دايت، سبرايت، فانتا) مع الثلج",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    category: "beverages",
    categoryAr: "المشروبات",
    availability: true,
    preparationTime: 2,
    rating: 4.0
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food-ordering');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${result.length} products successfully!`);

    await mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
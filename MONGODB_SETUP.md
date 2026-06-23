# MongoDB Setup Guide for Food Ordering App

## 1. Install MongoDB

### Windows
- Download from: https://www.mongodb.com/try/download/community
- Run the installer
- Choose "Install MongoDB as a Service"
- MongoDB will start automatically

### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu)
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

## 2. Verify MongoDB Installation

```bash
# Open MongoDB shell
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017
# MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
# (if MongoDB service isn't running, start it first)
```

## 3. Create Database and Collections

### Option A: Using MongoDB Shell
```bash
# Open MongoDB shell
mongosh

# Switch to food-ordering database
use food-ordering

# Create collections with schema validation
db.createCollection("users")
db.createCollection("products")
db.createCollection("orders")

# Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true })
db.products.createIndex({ category: 1 })
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ createdAt: -1 })

# Verify collections
show collections
```

### Option B: Using MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Create new database: `food-ordering`
4. Create collections: `users`, `products`, `orders`

## 4. Insert Sample Data

### Option A: Direct Shell Commands
1. Open MongoDB shell: `mongosh`
2. Copy and paste commands from `SAMPLE_DATA.js`
3. Or run the file: `mongosh < SAMPLE_DATA.js`

### Option B: Using MongoDB Compass
1. Right-click on collection
2. Select "Insert Document"
3. Paste JSON data
4. Click Insert

### Option C: Node.js Script
```bash
# Create a script to insert data
node seed-database.js
```

## 5. Verify Data Installation

```bash
# In MongoDB shell
use food-ordering

# Check collections
show collections

# Check data
db.users.find()
db.products.find()
db.products.countDocuments()

# Check specific user
db.users.findOne({ email: "admin@foodapp.com" })
```

## 6. Connection String

### Development (Local)
```
mongodb://localhost:27017/food-ordering
```

### With Authentication
```
mongodb://username:password@localhost:27017/food-ordering
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster.mongodb.net/food-ordering?retryWrites=true
```

## 7. Update .env File

```env
MONGODB_URI=mongodb://localhost:27017/food-ordering
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

## 8. Common Issues & Solutions

### Issue: "connect ECONNREFUSED"
**Solution**: MongoDB service not running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Issue: "E11000 duplicate key error"
**Solution**: Email already exists
```bash
# Remove duplicate
db.users.deleteOne({ email: "admin@foodapp.com" })
```

### Issue: "MongooseError: Cannot connect"
**Solution**: Check connection string in .env file

## 9. Database Backup

### Create Backup
```bash
# Dump database
mongodump --out ./backup/food-ordering --db food-ordering
```

### Restore Backup
```bash
# Restore database
mongorestore --db food-ordering ./backup/food-ordering
```

## 10. Database Maintenance

### View All Databases
```bash
show dbs
```

### Switch Database
```bash
use food-ordering
```

### View Collections in Current Database
```bash
show collections
```

### Drop Collection
```bash
db.collection_name.drop()
```

### Drop Database
```bash
db.dropDatabase()
```

### Check Database Size
```bash
db.stats()
```

## 11. User Roles & Permissions

### Create Admin User (with bcrypt hashed password)
```javascript
// In Node.js
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash('admin123', 10);

// Insert into MongoDB
db.users.insertOne({
  name: "Admin User",
  email: "admin@foodapp.com",
  password: hashedPassword,
  phone: "+1-800-ADMIN",
  address: "Restaurant HQ",
  role: "admin",
  createdAt: new Date()
})
```

### Create Regular User
```javascript
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  password: hashedPassword,
  phone: "+1-555-1234",
  address: "123 Main Street",
  role: "user",
  createdAt: new Date()
})
```

## 12. MongoDB Tools

### MongoDB Shell (mongosh)
- Interactive database tool
- Query and manage data
- Run scripts

### MongoDB Compass
- GUI tool
- Visual query builder
- Schema explorer

### MongoDBAtlas
- Cloud database
- Automatic backups
- Monitoring

## 13. Performance Tips

1. **Create Indexes**
   ```javascript
   db.users.createIndex({ email: 1 })
   db.products.createIndex({ category: 1 })
   ```

2. **Limit Query Results**
   ```javascript
   db.orders.find().limit(10)
   ```

3. **Use Projections**
   ```javascript
   db.users.find({}, { password: 0 }) // Exclude password
   ```

4. **Check Query Performance**
   ```javascript
   db.collection.find().explain("executionStats")
   ```

## 14. Security Best Practices

✓ Always use strong passwords
✓ Enable authentication in production
✓ Use environment variables for credentials
✓ Regular backups
✓ Monitor database access
✓ Use HTTPS in production
✓ Validate all input data

## 15. Troubleshooting Commands

```bash
# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"

# View current operations
db.currentOp()

# Kill slow operation
db.killOp(opid)

# Rebuild indexes
db.collection.reIndex()

# Compact database
db.runCommand({ compact: 'collection_name' })
```

---

## Quick Start Checklist

- [ ] Install MongoDB
- [ ] Start MongoDB service
- [ ] Create food-ordering database
- [ ] Create collections (users, products, orders)
- [ ] Insert sample data from SAMPLE_DATA.js
- [ ] Verify connections
- [ ] Update .env file with connection string
- [ ] Test backend connection
- [ ] Start application

---

## Support

For more MongoDB documentation:
- Official Docs: https://docs.mongodb.com/
- MongoDB University: https://university.mongodb.com/
- Community: https://www.mongodb.com/community/

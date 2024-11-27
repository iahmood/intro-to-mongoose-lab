require('dotenv').config()
const mongoose = require('mongoose')
const prompt = require('prompt-sync')()
const Customer = require('./models/Customer')

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB!')
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err)
  }
}

const username = prompt('What is your name? ')
console.log(`Your username: ${username}`)

const askChoice = () => {
  console.log(
    '\nWhat would you like to do? \n',
    '1. Create a customer\n',
    '2. View all customers\n',
    '3. Update customer info\n',
    '4. Delete a customer\n',
    '5. Quit\n'
  )

  const selection = prompt('Enter the number of the action you want to do: ')
  return parseInt(selection)
}

const createCustomer = async () => {
  const name = prompt('Customer Name: ')
  const age = prompt('Customer Age: ')
  const customer = await Customer.create({ name, age })
  console.log('Customer added with details:', customer)
}

const viewCustomers = async () => {
  const customers = await Customer.find()
  console.log('Customer List: ', customers)
}

const updateCustomer = async () => 
  {
  const id = prompt('Enter the ID of the customer you want to update: ')
  const name =prompt("Enter the name:");
  const age = prompt("Enter the age");
  const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, age })
  console.log('Customer Updated: ', updatedCustomer)
}

const deleteCustomer = async () => {
  const id = prompt('Enter the ID of the Customer you want to delete: ')
  const deletedCustomer = await Customer.findByIdAndDelete(id)
  console.log('Customer Deleted: ', deletedCustomer)
}

const choices = async () => {
  let choice
  do {
    choice = askChoice()
    switch (choice) {
      case 1:
        await createCustomer()
        break
      case 2:
        await viewCustomers()
        break
      case 3:
        await updateCustomer()
        break
      case 4:
        await deleteCustomer()
        break
      case 5:
        console.log('Finish process')
        await mongoose.connection.close()
        break
      default:
        console.log('Incorrect Choice.')
    }
  } while (choice !== 5)
}

connect().then(choices)

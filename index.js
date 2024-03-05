const express = require('express')
const mongoose = require('mongoose')
const { Expense } = require('./schema.js')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const cors = require('cors')
app.use(cors())


const port = process.env.PORT || 4000
async function connectiontoDB() {
    try {
        await mongoose.connect(`mongodb+srv://Hema__:Hema1234@cluster0.doyohtd.mongodb.net/Expense_Tracker?retryWrites=true&w=majority&appName=Cluster0`)
            // const port = 4000
        app.listen(port, function() {
            console.log(`Listening to port ${port}`)
        })
    } catch (error) {
        console.log("couldn'/t establish connection")
    }
}

connectiontoDB()
app.post('/expense', async function(request, response) {
    try {
        await Expense.create({
            "amount": request.body.amount,
            "categery": request.body.categery,
            "date": request.body.date
        })
        response.status(201).json({ //status code is 200 when we create new 
            "Status": "Success",
            "message": "entry created"
        })
    } catch (error) {
        response.status(500).json({ //status code is 500 when we get a error ,because it is internal serverr error
            "Status": "Failure"

        }, {
            "Msg": "couldn'\t add value"
        })
    }
    // console.log(request.body)
    // response.json({ "Status": "Added" })
})
app.get('/findExpense', async function(request, response) {
    try {
        const Expensedata = await Expense.find()
        response.status(200).json(Expensedata)
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "msg": "couldn't find values",
            "Error": error
        })
    }
})
app.delete('/deleteexpense/:id', async function(request, response) {
    const expensedata = Expense.findById(request.params)
    try {
        if (expensedata) {
            await Expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "Status": "Success",
                "message": "Deleted entry"
            })
        } else {
            response.status(200).json({
                "Status": "failure",
                "message": "Couldn'/t delete entry"
            })
        }
    } catch (error) {
        response.status(404).json({
            "Status": "Failure",
            "message": "couldn'/t delete entry",
            "error": error
        })
    }
})
app.patch('/updateexpense/:id', async function(request, response) {

    const expenseentry = await Expense.findById(request.params.id)
    if (expenseentry) {
        try {
            await expenseentry.updateOne({
                "amount": request.body.amount,
                "categery": request.body.categery,
                "date": request.body.date
            })

            response.status(200).json({
                "Status": "Succuss",
                "message": "Updated"
            })
        } catch (error) {
            response.status(404).json({
                "status": "failure",
                "Message": "couldn'/t updated"
            })
        }
    } else {
        response.status(404).json({
            "Status": "failure",
            "Message": "couldn't updated"
        })
    }
})
const mongoose = require('mongoose')
const express = require('express')

const ExpensetrackerSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    categery: {
        type: String
    },
    date: {
        type: String
    }
})
const Expense = mongoose.model(`expensedetails`, ExpensetrackerSchema)

module.exports = { Expense }
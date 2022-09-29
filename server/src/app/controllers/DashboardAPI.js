const mongoose = require('mongoose');
// models
const Product = require('../models/Product');
const Order = require('../models/Order');
const { Types, Account, Customer, Administrator } = require('../models/Account');

class DashboardAPI {
    // [GET] ../*
    async DashboardALL(req, res, next){
        try {
            const totalProduct = await Product.count({ inventory_status: 'availabel' });
            const totalOrder = await Order.count();
            const totalUser = await Account.count();
            const Sales = await Order.aggregate([
				{
					$match: {  },
				},
				{
					$project: {
						_id: 0,
						'price_summary.name': 1,
						'price_summary.value': 1,
					},
				},
				{
					$unwind: '$price_summary',
				},
				{
					$replaceRoot: {
						newRoot: '$price_summary',
					},
				},
			]);
            var totalSale = Sales.reduce(function(_this, val) {
                return _this + val.value;
            }, 0);
            let number = parseInt(5);
			const GRAVITY = 1.8;
			const products = await Product.aggregate([
				{
					$match: { inventory_status: 'availabel' },
				},
				{
					$addFields: {
						time_elapsed: {
							$divide: [{ $subtract: ['$$NOW', '$updatedAt'] }, 3600000],
						},
					},
				},
				{
					$project: {
						name: 1,
						images: 1,
						slug: 1,
						quantity_sold: 1,
						score: {
							$divide: [
								'$quantity_sold.value',
								{
									$pow: [{ $add: ['$time_elapsed', 2] }, GRAVITY],
								},
							],
						},
					},
				},
				{
					$limit: number,
				},
			]);
            const history = await Order.aggregate([
				{
					$project: {
						_id: 0,
						'tracking_infor.status': 1,
						'tracking_infor.status_text': 1,
                        'tracking_infor.time': 1,
					},
				},
				{
					$unwind: '$tracking_infor',
				},
				{
					$replaceRoot: {
						newRoot: '$tracking_infor',
					},
				},
			]);
            const filter = {
                $and: [
                    { 'tracking_infor.status': 'processing' }
                ],
            };
            const graph = await Order.find(filter).select([
                'tracking_infor',
                'price_summary',
                'updatedAt'
            ]);
            res.status(200).json({
                data: {
                    statistic: { 
                        totalSale,
                        totalOrder,
                        totalUser,
                        totalProduct
                    },
                    graph,                 
                    products,
                    history
                },
                message: 'success'
            });
        } catch (error) {
            console.error(error);
            next({ status: 500, msg: error.message });
        }
    }
    // [GET] /countproduct
    async countProduct(req, res, next){
        try {
            const totalProduct = await Product.count({});
            const totalProductAvailabel = await Product.count({ inventory_status: 'availabel' });
            res.status(200).json({
                totalProduct,
                totalProductAvailabel,
                message: 'success'
            });
        } catch (error) {
            console.error(error);
            next({ status: 500, msg: error.message });
        }
    }
    // [GET] /countorder
    async countOrder(req, res, next){
        try {
            const totalOrder = await Order.count({});
            res.status(200).json({
                totalOrder,
                message: 'success'
            });
        } catch (error) {
            console.error(error);
            next({ status: 500, msg: error.message });
        }
    }
    // [GET] /countuser
    async countUser(req, res, next){
        try {
            const totalUser = await Account.count({});
            res.status(200).json({
                totalUser,
                message: 'success'
            });
        } catch (error) {
            console.error(error);
            next({ status: 500, msg: error.message });
        }
    }
    // [GET] /trend[sold]
    async trend(req, res, next){
        try {
			let number = parseInt(5);
			const GRAVITY = 1.8;
			const products = await Product.aggregate([
				{
					$match: { inventory_status: 'availabel' },
				},
				{
					$addFields: {
						time_elapsed: {
							$divide: [{ $subtract: ['$$NOW', '$updatedAt'] }, 3600000],
						},
					},
				},
				{
					$project: {
						name: 1,
						images: 1,
						slug: 1,
						quantity_sold: 1,
						score: {
							$divide: [
								'$quantity_sold.value',
								{
									$pow: [{ $add: ['$time_elapsed', 2] }, GRAVITY],
								},
							],
						},
					},
				},
				{
					$limit: number,
				},
			]);
			res.status(200).json({
                products,
                message: 'success'
            });
        } catch (error) {
            console.error(error);
            next({ status: 500, msg: error.message });
        }
    }
    // [GET] /sale
    async sumSales(req, res, next){
        try {
            const totalSales = await Order.aggregate([
				{
					$match: {  },
				},
				{
					$project: {
						_id: 0,
						'price_summary.value': 1,
					},
				},
				{
					$unwind: '$price_summary',
				},
				{
					$replaceRoot: {
						newRoot: '$price_summary',
					},
				},
			]);
            var sum = totalSales.reduce(function(_this, val) {
                return _this + val.value;
            }, 0);
            res.status(200).json({
                totalSales,
                sum,
                message: 'success'
            });
        } catch (error) {
            console.error(error);
            next({ status: 500, msg: error.message });
        }
    }
    // [GET] /history
    async historyOrder(req, res, next){
        try {
            const history = await Order.find().select([
                '_id',
                'customer_id',
                'tracking_infor',
                'createdAt',
                'updatedAt'
            ])

            res.status(200).json({
                history,
                message: 'success'
            });
        } catch (error) {
            console.error(error);
            next({ status: 500, msg: error.message });
        }
    }
        // [GET] /graph
        async revenueGraph(req, res, next){
            try {
                const filter = {
                    $and: [
                        { 'tracking_infor.status': 'processing' }
                    ],
                };
                const graph = await Order.find(filter).select([
                    'tracking_infor',
                    'price_summary',
                    'updatedAt'
                ]);
                res.status(200).json({
                    graph,
                    message: 'success'
                });
            } catch (error) {
                console.error(error);
                next({ status: 500, msg: error.message });
            }
        }
}

module.exports = new DashboardAPI();
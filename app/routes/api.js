var Configure = require('../models/configure');
var MenuItem = require('../models/item');
var Order = require('../models/order');

module.exports = function(app, express){

	var apiRouter = express.Router();
	apiRouter.route('/configure')
		
		.post(function(req,res){
			
			var configure = new Configure();

			configure.type = req.body.type;
			configure.list = req.body.list;
			configure.save(function(err){
				if(err){
					if(err.code == 11000)
						return res.json({ success: false, message: 'This configuration has already been saved!'});
					else
						return res.send(err);
				}
				res.json({ message: 'Successful configuration' });
			})
		})

		.get(function(req,res){


			Configure.find(function(err, configuration){
				if(err) res.send(err);
				res.json(configuration);
			});
		});

	apiRouter.route('/configure/:list_id')

		.get(function(req,res){
			Configure.findById(req.params.list_id, function(err, list){
				if (err) res.send(err);
				res.json(list);
			});
		})

		//update the job with this id
		//(access at PUT http://localhost:8080/api/jobs/:job_id)
		.put(function(req,res){
			// use our job model to find the job we want
			Configure.findById(req.params.list_id, function(err, list){
				if (err) res.send(err);
				//update the jobs info only if its new
				list.list = req.body;

				// if(req.body.jobname) job.jobname = req.body.jobname;
				// if(req.body.password) job.password = req.body.password;

				// save the job
				list.save(function(err){
					if(err) res.send(err);

					//return a message
					res.json({ message: 'job updated!' });
				})
			});
		})
	apiRouter.route('/menuItem')
		
		.post(function(req,res){
			var menuItem = new MenuItem();
			menuItem.type = req.body.type;
			menuItem.typeList = req.body.typeList;
			menuItem.save(function(err){
				if(err){
					if(err.code == 11000)
						return res.json({ success: false, message: 'This configuration has already been saved!'});
					else
						return res.send(err);
				}
				res.json({ message: 'Successful configuration' });
			})
		})

		.get(function(req,res){


			MenuItem.find(function(err, item){
				if(err) res.send(err);
				res.json(item);
			});
		});

	apiRouter.route('/menuItem/:item_id')

		.get(function(req,res){
			MenuItem.findById(req.params.item_id, function(err, item){
				if (err) res.send(err);
				res.json(item);
			});
		})

		.put(function(req,res){
	
			MenuItem.findById(req.params.item_id, function(err, item){
				if (err) res.send(err);
			
				for(list in req.body){
					item.typeList.push(req.body[list]);
				}
				console.log(item);
				item.save(function(err){
					if(err) res.send(err);

					//return a message
					res.json({ message: 'job updated!' });
				})
			});
		})
		.patch(function(req,res){
			MenuItem.findOneAndUpdate({"_id" : req.params.item_id}, {$pull:{typeList:{"_id" : req.body.item}}}, function(err, data){
		        if(err) {
		          return res.status(500).json({'error' : 'error in deleting address'});
		        }

		        res.json({ message: 'item deleted!' });

		      });
		});
	apiRouter.route('/order')
		
		.post(function(req,res){
			var order = new Order();
			order.item = req.body.item;	
				order.vendor = req.body.vendor;
			order.orderNum = req.body.orderNum;
				order.company = req.body.company;
				order.contact = req.body.contact;
				order.address = req.body.address;
				order.city = req.body.city;
				order.phone = req.body.phone;
				order.orderDate = req.body.orderDate;
				order.setUpTime = req.body.setUpTime;
				order.headCount = req.body.headCount;
				order.total = req.body.total;
				order.entryDate = req.body.entryDate;
			order.save(function(err){
				if(err){
					if(err.code == 11000)
						return res.json({ success: false, message: 'This configuration has already been saved!'});
					else
						return res.send(err);
				}
				res.json({ message: 'Successful configuration' });
			})
		})

		.get(function(req,res){


			Order.find(function(err, item){
				if(err) res.send(err);
				res.json(item);
			});
		});

	apiRouter.route('/order/:item_id')

		.get(function(req,res){
			Order.findById(req.params.item_id, function(err, item){
				if (err) res.send(err);
				res.json(item);
			});
		})

		.put(function(req,res){
	
			Order.findById(req.params.item_id, function(err, item){
				if (err) res.send(err);
			
				for(list in req.body){
					item.typeList.push(req.body[list]);
				}
				console.log(item);
				item.save(function(err){
					if(err) res.send(err);

					//return a message
					res.json({ message: 'job updated!' });
				})
			});
		})

	// 	//DELETE the job with this id
	// 	//(access at DELETE http://localhost:8080/api/jobs/:job_id)
	// 	.delete(function(req,res){
		// db.items.update({"_id" : ObjectId("577971e12cb4be263241790d")}, {$pull:{typeList:{"_id" : ObjectId("577978892cb4be2632417911")}}})
	// 		
		// Customer.findOneAndUpdate({"_id" : ObjectId("577971e12cb4be263241790d")}, {$pull:{typeList:{"_id" : ObjectId("577978892cb4be2632417911")}}}, function(err, data){
	 //        if(err) {
	 //          return res.status(500).json({'error' : 'error in deleting address'});
	 //        }

	 //        res.json(data);

	 //      });
	// job.remove({
	// 			_id: req.params.job_id
	// 		}, function(err, job){
	// 			if(err) return res.send(err);

	// 			res.json({ message: 'Successfully deleted' });
	// 		});
	// 	});

	// apiRouter.get('/me', function(req,res){
	// 	res.send(req.decoded);
	// });
	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	return apiRouter;
};
var Job = require('../models/job');

module.exports = function(app, express){

	var apiRouter = express.Router();
	var order = 0;
	apiRouter.route('/jobs')
		
		.post(function(req,res){
			
			var job = new Job();

			job.job = req.body;
			job.order = order;

			job.save(function(err){
				if(err){
					if(err.code == 11000)
						return res.json({ success: false, message: 'This job has already been saved!'});
					else
						return res.send(err);
				}
				console.log(job);
				order+=1;
				console.log(order);
				res.json({ message: 'Added to My Jobs!' });
			})
		})

		.get(function(req,res){
			Job.find(function(err, jobs){
				if(err) res.send(err);
				res.json(jobs);
			});
		});

	// apiRouter.route('/jobs/:job_id')

	// 	// get the job with that id
	// 	// (accessed at GET http://localhost:8080/api/job/:job_id)
	// 	.get(function(req,res){
	// 		job.findById(req.params.job_id, function(err, job){
	// 			if (err) res.send(err);

	// 			//return that job
	// 			res.json(job);
	// 		});
	// 	})

	// 	//update the job with this id
	// 	//(access at PUT http://localhost:8080/api/jobs/:job_id)
	// 	.put(function(req,res){

	// 		//use our job model to find the job we want
	// 		job.findById(req.params.job_id, function(err, job){
	// 			if (err) res.send(err);

	// 			//update the jobs info only if its new
	// 			if(req.body.name) job.name = req.body.name;
	// 			if(req.body.jobname) job.jobname = req.body.jobname;
	// 			if(req.body.password) job.password = req.body.password;

	// 			//save the job
	// 			job.save(function(err){
	// 				if(err) res.send(err);

	// 				//return a message
	// 				res.json({ message: 'job updated!' });
	// 			})
	// 		});
	// 	})

	// 	//DELETE the job with this id
	// 	//(access at DELETE http://localhost:8080/api/jobs/:job_id)
	// 	.delete(function(req,res){
	// 		job.remove({
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
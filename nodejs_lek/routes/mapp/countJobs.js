app.get('/countJobs', function(req, res) {
    db.query("SELECT * FROM job_ad", function(err, results){
        if (err) throw err;
        res.render('mapp/count_jobs', {title: "Count Jobs", results : results});
    });
});
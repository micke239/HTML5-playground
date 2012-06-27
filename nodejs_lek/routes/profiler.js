/*
 * GET profiler.
 */
app.get('/profiler', function(req, res){
    db.query("SELECT recruiter.name as name, pres.id as id, recruiter.logoImageId as logo " +
        "FROM recruiter_presentation as pres, recruiter " +
        "WHERE pres.recruiter_id = recruiter.id",
        function(err, results) {
            if (err) throw err;
            res.render('profiler', { title: 'Profiler', results : results })
    });
});
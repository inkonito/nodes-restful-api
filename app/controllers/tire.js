var mongoose = require('mongoose'),
    Tire = mongoose.model("Tire"),
    ObjectId = mongoose.Types.ObjectId

exports.listTires = function(req, res, next){
    Tire.find({}, function(err, tires){
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        }
        else{
            res.json({
                type: true,
                data: tires
            })
        }
    })
}

exports.createTire = function(req, res, next) {
    var tireModel = new Tire(req.body);
    tireModel.save(function(err, tire) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: tire
            })
        }
    })
}

exports.viewTire = function(req, res, next) {
    Tire.findById(new ObjectId(req.params.id), function(err, tire) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (tire) {
                res.json({
                    type: true,
                    data: tire
                })
            } else {
                res.json({
                    type: false,
                    data: "Tire: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.updateTire = function(req, res, next) {
    var updatedTireModel = new Tire(req.body);
    Tire.findByIdAndUpdate(new ObjectId(req.params.id), updatedTireModel, function(err, tire) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (tire) {
                res.json({
                    type: true,
                    data: tire
                })
            } else {
                res.json({
                    type: false,
                    data: "Tire: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.deleteTire = function(req, res, next) {
    Tire.findByIdAndRemove(new Object(req.params.id), function(err, tire) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "Tire: " + req.params.id + " deleted successfully"
            })
        }
    })
}

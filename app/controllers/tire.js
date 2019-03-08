var mongoose = require('mongoose'),
    Tire = mongoose.model("Tire"),
    ObjectId = mongoose.Types.ObjectId

exports.listTires = function(req, res, next){
    console.log("it works");
    Tire.find({}, function(err, tires){
        console.log("tire returns");
        if (err) {
            console.log("err: ", err);

            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        }
        else{
            console.log("no error ", tires);
            res.json(tires)
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
            res.json(tire)
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
                res.json(tire)
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
                res.json(tire)
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
            res.json("Tire: " + req.params.id + " deleted successfully")
        }
    })
}

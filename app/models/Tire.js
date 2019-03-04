var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var TireSchema = new Schema({
    id: number,
    cai: String,
    brand: String,
    name: String,
});
mongoose.model('Tire', TireSchema);
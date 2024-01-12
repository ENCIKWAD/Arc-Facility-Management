const Facility = require("../models/facility");

module.exports = class OwnerController {
  static async fetchFacilities(req, res) {
    try {
      const facilities = await Facility.find();
      res.status(200).json(facilities);
    } catch (err) {
      res.status(400).json({ message: "There are no facilities" });
    }
  }

  static async fetchFacilityByID(req, res) {
      const id = req.params.id;
    try{
        const facility = await Facility.findById(id);
        if(!facility){
            return res.status(404).json({message: "This facility is not found"});
        }
        res.status(200).json(facility);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

static async updateFacility(req, res) {
    const facility = req.body
    const id = req.params.id
    try{
        await Facility.findByIdAndUpdate(id, facility);
        res.status(200).json({message: "Facility updated successfully"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

static async deleteFacility(req, res){
    const id = req.params.id;
    try{
        const result = await Facility.findByIdAndDelete(id);
        res.status(200).json({message: "Facility deleted successfully"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

  static async createFacility(req, res) {
    try {
      const facility = req.body;

      // Check if a facility with the same name already exists
      const existingFacility = await Facility.findOne({
        title: facility.title,
      });

      if (existingFacility) {
        // If a facility with the same name exists, return an error
        return res
          .status(400)
          .json({ message: "Facility with the same name already exists" });
      }

      // If no duplicate, create the facility
      const newFacility = await Facility.create(facility);

      res
        .status(201)
        .json({
          message: "Facility created successfully",
          facility: newFacility,
        });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

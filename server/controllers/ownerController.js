const Facility = require("../models/facility");
const Report = require("../models/report");
const LeaseRequest = require("../models/request");

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

  static async createReport(req, res){
    try{
      const report = req.body;

      const existingReport = await Report.findOne({
        title: report.title
      })


      if(existingReport){
        return res.status(400).json({message: "You have already made this report"})
      }

      const newReport = await Report.create(report);

      res.status(201).json({message: "Report created successfully", report: newReport});
    }
    catch(err){
      res.status(400).json({message: err.message});
    }
  }

  static async fetchRequests(req, res){
    try{
      const leaseRequests = await LeaseRequest.find();
      res.status(200).json(leaseRequests);
    }
    catch(err){
      res.status(400).json({message: err.message});
    }
  }

  static async editRequest(req, res){
    try{
      const id = req.body._id;
      const leaseRequest = req.body;
      await LeaseRequest.findByIdAndUpdate(id, leaseRequest);
      res.status(200).json({message: "Request edited successfully"});
    }
    catch(err){
      res.status(400).json({message: err.message});
    }
  }

  // static async deleteRequest(req, res){
  //   const id = req.body._id;
  //   try{
  //     const request = await LeaseRequest.findByIdAndDelete(id);
  //     res.status(200).json({message: "Request deleted successfully"});
  //   }
  //   catch(err){
  //     res.status(400).json({message: err.message});
  //   }
  // }
};

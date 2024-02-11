const Facility = require("../models/Facility");
const Report = require("../models/Report");
const LeaseRequest = require("../models/Request");
const Announcement = require("../models/Announcement");
const User = require("../models/users");
const fs = require('fs')

module.exports = class OwnerController {

  static async fetchFacilities(req, res) {
    try {
      const facilities = await Facility.find();
      return res.status(200).json(facilities);
    } catch (err) {
      return res.status(400).json({ message: "There are no facilities" });
    }
  }

  static async fetchFacilityByID(req, res) {
    const id = req.params.id;
    try {
      const facility = await Facility.findById(id);
      if (!facility) {
        return res.status(404).json({ message: "This facility is not found" });
      }
      return res.status(200).json(facility);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async updateFacility(req, res) {
    const id = req.params.id;
    let new_image = ''
    if(req.file){
      new_image = req.file.filename;
      try{
        fs.unlinkSync('./uploads/' + req.body.old_image)
      }
      catch(err){
        return res.status(402).json({message: err.message})
      }
    }
    else{
      new_image = req.body.old_image
    }
    const facility = req.body;
    facility.image = new_image;
    if(facility.title == "" || facility.description == "" || facility.image == "" || facility.location == "" || facility.minCap == "" || facility.type == "" || facility.available == ""){
      return res.status(400).json({message: "Please fill all the fields"});
    }
    try {
      await Facility.findByIdAndUpdate(id, facility);
      return res.status(200).json({ message: "Facility updated successfully" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async deleteFacility(req, res) {
    try {
      const id = req.params.id;
      const result = await Facility.findByIdAndDelete(id);
      return res.status(200).json({ message: "Facility deleted successfully" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async createFacility(req, res) {
    try {
      const facility = req.body;
      facility.image = req.file.filename;
      if (facility.title == "" || facility.description == "" || facility.image == "" || facility.location == "" || facility.minCap == "" || facility.type == "" || facility.available == "") {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

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

       return res.status(201).json({
        message: "Facility created successfully",
        facility: newFacility,
      })
    } catch (err) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
  }


  static async fetchRequests(req, res) {
    try {
      const leaseRequests = await LeaseRequest.find();
      return res.status(200).json(leaseRequests);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async editRequest(req, res) {
    try {
      const id = req.body._id
      const leaseRequest = req.body;
      await LeaseRequest.findByIdAndUpdate(id, leaseRequest);
      return res.status(200).json({ message: "Request edited successfully" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async search(req, res){
    const search = req.body.search;
    let find = await Facility.find({title: {$regex: new RegExp('.*'+search+'.*', 'i')}}).limit(4).exec()
    return res.status(200).json(find)
  }

  static async sort(req, res){
    const sort = req.body.sort;
    if(sort === 'n'){
      let find = await Facility.find().exec()
      return res.status(200).json(find)
    }
    let sortObject = {};
    sortObject[sort] = -1;
    let find = await Facility.find().sort(sortObject).exec()
    return res.status(200).json(find)
  }

  static async fetchTenantsByEmail(req, res){
    try{
      const tenants = await User.find({role: "tenant"});
      return res.status(200).json(tenants);
    }
    catch(err){
      return res.status(400).json({message: err.message});
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

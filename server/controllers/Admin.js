const Report = require ('../models/Report');
const User = require ('../models/users');
const Announcement = require ('../models/Announcement');
const Facility = require ('../models/Facility');

module.exports = class AdminController{
    static async fetchReports(req, res){
        try{
            const reports = await Report.find();
            return res.status(200).json(reports);
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async getUserById(req, res){
        try{
            const id = req.body.id;
        const user = await User.findById(id);
        return res.status(200).json(user);
        }
        catch(err){
            console.log(err.message);
        }
    }

    static async getFacilityById(req, res){
        try{
            const id = req.body.id;
        const facility = await Facility.findById(id);
        return res.status(200).json(facility);
        }
        catch(err){
            console.log(err.message);
        }
    }

    static async fetchReportByID(req, res){
        try{
            const id = req.params.id;
            const report = await Report.findById(id);
            if(!report){
                return res.status(404).json({message: "This report is not found"});
            }
            return res.status(200).json(report);
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async deleteReport(req, res){
        try{
            const id = req.params.id;
            const report = await Report.findByIdAndDelete(id);
            return res.status(200).json({message: "Report deleted successfully"});
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async fetchTenants(req, res){
        try{
            const tenants = await User.find({role: "tenant"});
            return res.status(200).json(tenants);
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async fetchTenantByID(req, res){
        try{
            const id = req.params.id;
            const tenant = await User.findById(id);
            if(!tenant){
                return res.status(404).json({message: "This tenant is not found"});
            }
            return res.status(200).json(tenant);
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async editTenant(req, res){
        try{
            const id = req.body._id;
            const tenant = req.body;
            await User.findByIdAndUpdate(id, tenant);
            return res.status(200).json({message: "Tenant updated successfully"});
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async fetchAnnouncements(req, res){
        try{
            const announcements = await Announcement.find();
            return res.status(200).json(announcements);
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async createAnnouncement(req, res){
        try{
            const announcement = req.body;
            const newAnnouncement = Announcement(announcement);
            await newAnnouncement.save();
            return res.status(200).json({message: "Announcement created successfully"});
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async editAnnouncement(req, res){
        try{
            const id = req.params.id;
            const announcement = req.body;
            await Announcement.findByIdAndUpdate(id, announcement);
            return res.status(200).json({message: "Announcement updated successfully"});
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

    static async deleteAnnouncement(req, res){
        try{
            const id = req.params.id;
            await Announcement.findByIdAndDelete(id);
            return res.status(200).json({message: "Announcement deleted successfully"});
        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }
    
}
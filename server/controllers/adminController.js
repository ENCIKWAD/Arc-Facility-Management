const Report = require ('../models/report');
const User = require ('../models/users');
const Announcement = require ('../models/announcement');

module.exports = class AdminController{
    static async fetchReports(req, res){
        try{
            const reports = await Report.find();
            res.status(200).json(reports);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async fetchReportByID(req, res){
        try{
            const id = req.params.id;
            const report = await Report.findById(id);
            if(!report){
                return res.status(404).json({message: "This report is not found"});
            }
            res.status(200).json(report);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async deleteReport(req, res){
        try{
            const id = req.params.id;
            const report = await Report.findByIdAndDelete(id);
            res.status(200).json({message: "Report deleted successfully"});
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async fetchTenants(req, res){
        try{
            const tenants = await User.find({role: "tenant"});
            res.status(200).json(tenants);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async fetchTenantByID(req, res){
        try{
            const id = req.params.id;
            const tenant = await User.findById(id);
            if(!tenant){
                return res.status(404).json({message: "This tenant is not found"});
            }
            res.status(200).json(tenant);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async editTenant(req, res){
        try{
            const id = req.body._id;
            const tenant = req.body;
            await User.findByIdAndUpdate(id, tenant);
            res.status(200).json({message: "Tenant updated successfully"});
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async fetchAnnouncements(req, res){
        try{
            const announcements = await Announcement.find();
            res.status(200).json(announcements);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async createAnnouncement(req, res){
        try{
            const announcement = req.body;
            const newAnnouncement = Announcement(announcement);
            await newAnnouncement.save();
            res.status(200).json({message: "Announcement created successfully"});
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async editAnnouncement(req, res){
        try{
            const id = req.params.id;
            const announcement = req.body;
            await Announcement.findByIdAndUpdate(id, announcement);
            res.status(200).json({message: "Announcement updated successfully"});
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }

    static async deleteAnnouncement(req, res){
        try{
            const id = req.params.id;
            await Announcement.findByIdAndDelete(id);
            res.status(200).json({message: "Announcement deleted successfully"});
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }
    
}
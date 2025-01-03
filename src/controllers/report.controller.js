import Report from "../models/reports.js";
export const createReport = async (req, res) => {
    const {
        reporter,
        reported,
        details
    } = req.body;
    
    try {
        const report = new Report({
        reporter,
        reported,
        details
        });
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({
        message: 'Failed to create report',
        error
        });
    }
};
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({
        message: 'Failed to fetch reports',
        error
        });
    }
}
export const updateReport = async (req, res) => {
    const { id, status } = req.body;

    const validStatuses = ['pending', 'resolved', 'under-review'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: 'Invalid status value. Valid values are "pending", "resolved", and "under-review".',
        });
    }

    try {
        const updatedReport = await Report.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedReport) {
            return res.status(404).json({ message: 'No report found with this ID.' });
        }
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update report status',
            error,
        });
    }
};

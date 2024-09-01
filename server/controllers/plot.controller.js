import Plot from '../models/Plot.model.js';

export const addPlot = async (req, res) => {
    try {
        const { cropid, cropsowingdate } = req.body;
        
        const newPlot = new Plot({
            userid: req.user.id,
            cropid,
            cropsowingdate: new Date(cropsowingdate),
            detectstatus: 'Not detected' // Default status
        });

        try {
            await newPlot.save();
            console.log('Plot saved successfully');
        } catch (error) {
            console.error('Error saving plot:', error);
        }
        
        res.status(201).json({ success: true, message: 'Plot added successfully', plot: newPlot });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding plot', error: error.message });
    }
};
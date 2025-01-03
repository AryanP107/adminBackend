import Issue from '../models/issues.js';
export const createIssue = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const issue = new Issue({
      name,
      email,
      message,
    });

    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create issue', error });
  }
};


export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'An error occurred while fetching issues', error: error.message });
  }
};



export const updateIssue = async (req, res) => {
  const { issueId, status } = req.body;

  const validStatuses = ['pending', 'resolved', 'in-progress'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status value. Valid values are "pending", "resolved", and "in-progress".',
    });
  }

  try {
    if (!issueId) {
      return res.status(400).json({ message: 'Missing issueId in the request.' });
    }

    // Ensure issueId is a valid MongoDB ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(issueId)) {
      return res.status(400).json({ message: 'Invalid issueId format.' });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      issueId, // Use issueId to find the issue
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: 'No issue found with this ID.' });
    }

    res.json(updatedIssue);
  } catch (error) {
    console.error('Error updating issue:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Failed to update issue status', error: error.message });
  }
};

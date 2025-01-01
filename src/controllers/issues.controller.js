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
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch issues', error });
  }
};


export const updateIssue = async (req, res) => {
  const { email, status } = req.body;

  const validStatuses = ['pending', 'resolved', 'in-progress'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value. Valid values are "pending", "resolved", and "in-progress".' });
  }

  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { email },
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: 'No issue found with this email address.' });
    }

    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update issue status', error });
  }
};

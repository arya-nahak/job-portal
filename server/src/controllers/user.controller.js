exports.allAccess = (req, res) => {
    res.status(200).send("Public Content");
  };
  
  exports.applicantBoard = (req, res) => {
    res.status(200).send("Applicant Content");
  };
  
  exports.recruiterBoard = (req, res) => {
    res.status(200).send("Recruiter Content");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content");
  };
  
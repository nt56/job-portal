import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//student
export const applyJob = async (req, res) => {
  try {
    //get userid from cookie and jobid from params
    const userId = req.id;
    const jobId = req.params.jobId;

    //check jobid is required
    if (!jobId) {
      return res.status(400).json({
        message: "Job Id Required...!",
        success: false,
      });
    }

    //find and check if already application exist by userid and jobid
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "Application already exist...!",
        success: false,
      });
    }

    //find and check if job exist or not in Job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job Not Exist...!",
        success: false,
      });
    }

    //create new job application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    //push and save application.id into Job applications array
    job.applications.push(newApplication._id);
    await job.save();

    //send back the response
    res.status(200).json({
      message: "Successfully Job applied..!",
      success: true,
      data: newApplication,
    });
  } catch (error) {
    console.log(error);
  }
};

//get all jobs that are applied by the loggedIn user - student
export const getAppliedJobs = async (req, res) => {
  try {
    //get userid from cookie
    const userId = req.id;

    //find and check the all aaplied jobs by user from application model and pupulate
    const jobsApplied = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!jobsApplied) {
      return res.status(404).json({
        message: "Jobs not found...!",
        success: false,
      });
    }

    //send back the response
    res.status(400).json({
      message: "Applications...!",
      success: true,
      data: jobsApplied,
    });
  } catch (error) {
    console.log(error);
  }
};

//finding the applications for that given jobId - admin will get all the job appliacants
export const getApplicants = async (req, res) => {
  try {
    //get jobId from params
    const jobId = req.params.jobId;

    //find and check job and get the appliacants using populate
    const jobApplicants = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!jobApplicants) {
      return res.status(400).json({
        message: "Job Applicant or job not found...!",
        success: false,
      });
    }

    //send back the response
    return res.status(400).json({
      message: "Job Applicant or job found...!",
      success: true,
      data: jobApplicants,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin
export const updateStatus = async (req, res) => {
  try {
    //get status from body and appliationId from params
    const { status } = req.body;
    const applicationId = req.params.applicationId;

    //check status
    if (!status) {
      return res.status(400).json({
        message: "status not found...!",
        success: false,
      });
    }

    //find and check application by applicant id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "application not found...!",
        success: false,
      });
    }

    //update the status
    application.status = status;
    await application.save();

    //send back the response
    res.status(200).json({
      message: "application updated...!",
      success: true,
      data: application,
    });
  } catch (error) {
    console.log(error);
  }
};

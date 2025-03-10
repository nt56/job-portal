import { Job } from "../models/job.model.js";

//admin will be posting a job
export const postJob = async (req, res) => {
  try {
    //get userid from cookie
    const userId = req.id;

    //get feilds from req.body and check
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      positions,
      companyId,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobType ||
      !positions ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Feilds should not be empty",
        success: false,
      });
    }

    //create new job
    const newJob = await Job.create({
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      positions,
      company: companyId,
      createdBy: userId,
    });

    //send back the response
    res.status(201).json({
      message: "Job Created Successfully..!",
      success: true,
      data: newJob,
    });
  } catch (error) {
    console.log(error);
  }
};

//students
export const getAllJobs = async (req, res) => {
  try {
    //get keyword from query
    const keyword = req.query.keyword || "";

    //create query for it (filtering cmp based on title or description by matching keywords)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    //find the jobs and check
    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select: "name description website location",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      res.status(400).json({
        message: "Jobs not found..!",
        success: false,
      });
    }

    //send back the response
    res.status(201).json({
      message: "Jobs Found",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log();
  }
};

//students
export const getJobById = async (req, res) => {
  try {
    //get jobid from params
    const jobId = req?.params?.jobId;

    //find job and check
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      res.status(400).json({
        message: "Job not found..!",
        success: false,
      });
    }

    //send back the response
    res.status(201).json({
      message: "Job found..!",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

//getting jobs which are only created by admin
export const getJobsByAdmin = async (req, res) => {
  try {
    //get adminId from cookies
    const adminId = req.id;

    //find job by adminId and check
    const jobsByAdmin = await Job.find({ createdBy: adminId })
      .populate({
        path: "company",
        select: "name description website location",
      })
      .sort({ createdAt: -1 });
    if (!jobsByAdmin) {
      res.status(404).json({
        message: "Jobs not found..!",
        success: false,
      });
    }

    //send back the response
    res.status(201).json({
      message: "Jobs Found",
      success: true,
      jobsByAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};
